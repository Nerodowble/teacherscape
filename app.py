from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import bcrypt
import jwt
import os
import os.path
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, origins=['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082'])

JWT_SECRET = os.environ.get('JWT_SECRET') or 'your-secret-key'
DATABASE = os.path.join(os.path.dirname(__file__), 'backend', 'database', 'database.sqlite')
SALT_ROUNDS = 10

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            passwordHash TEXT NOT NULL,
            emailVerified INTEGER NOT NULL DEFAULT 0,
            profilePicture TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    passwordPlain = data.get('passwordPlain')

    if not name or not email or not passwordPlain:
        return jsonify({'error': 'Name, email, and password are required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if the email already exists
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    existing_user = cursor.fetchone()
    if existing_user:
        conn.close()
        return jsonify({'error': 'Email já existe'}), 400

    hashed_password = bcrypt.hashpw(passwordPlain.encode('utf-8'), bcrypt.gensalt(SALT_ROUNDS))
    user_id = str(uuid.uuid4())

    try:
        cursor.execute("INSERT INTO users (id, name, email, passwordHash) VALUES (?, ?, ?, ?)",
                       (user_id, name, email, hashed_password.decode('utf-8')))
        conn.commit()
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

    return jsonify({'message': 'User created successfully', 'userId': user_id}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    passwordPlain = data.get('passwordPlain')

    if not email or not passwordPlain:
        return jsonify({'error': 'Email and password are required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()

    if user is None:
        return jsonify({'error': 'Nome de usuário ou senha incorretos'}), 401

    if bcrypt.checkpw(passwordPlain.encode('utf-8'), user['passwordHash'].encode('utf-8')):
        # Generate JWT token
        payload = {
            'id': user['id'],
            'exp': datetime.utcnow() + timedelta(hours=1)  # Token expiration time
        }
        token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
        return jsonify({'message': 'Login successful', 'user': dict(user), 'token': token}), 200
    else:
        return jsonify({'error': 'Nome de usuário ou senha incorretos'}), 401

@app.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    conn.close()
    return jsonify([dict(user) for user in users]), 200

@app.route('/profile', methods=['GET'])
def get_profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        token = token.split(' ')[1]
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user_id = payload['id']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        conn.close()

        if user is None:
            return jsonify({'error': 'User not found'}), 404

        return jsonify({
            'id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'bio': user['bio'] or '',
        }), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/profile', methods=['DELETE'])
def delete_profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        token = token.split(' ')[1]
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user_id = payload['id']

        conn = get_db_connection()
        cursor = conn.cursor()

        # Verify password (assuming you send the password in the request)
        data = request.get_json()
        password = data.get('password')
        if not password:
            return jsonify({'error': 'Password is required'}), 400

        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()

        if not user:
            return jsonify({'error': 'User not found'}), 404

        if bcrypt.checkpw(password.encode('utf-8'), user['passwordHash'].encode('utf-8')):
            cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
            conn.commit()
            conn.close()
            return jsonify({'message': 'Account deleted successfully'}), 200
        else:
            conn.close()
            return jsonify({'error': 'Senha incorreta'}), 401

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

import uuid
if __name__ == '__main__':
    app.run(debug=True, port=3003)
