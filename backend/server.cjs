// backend/server.ts
const { initializeDatabase, createUser, verifyPassword, getUserByEmail, openDb } = require('./database.cjs');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
let port = 3003;

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Replace with a strong secret in production

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082'],
  exposedHeaders: ['Authorization'],
}));
app.use(express.json());

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) {
      console.log('Failed to verify token', err);
      return res.status(403).json({ error: 'Invalid token' });
    }

    try {
      const db = await openDb();
      const dbUser = await new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE id = ?`, [user.id], (err, row) => {
          if (err) {
            console.error('Failed to get user by id', err);
            reject(err);
          } else {
            resolve(row);
          }
        });
      });

      if (!dbUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      req.user = dbUser;
      next();
    } catch (error) {
      console.error('Failed to verify token', error);
      return res.status(500).json({ error: 'Failed to verify token' });
    }
  });
};

async function main() {
  try {
    await initializeDatabase();

    app.post('/register', async (req, res) => {
      console.log('Received registration request');
      try {
        const { name, email, passwordPlain } = req.body;
        console.log('Creating user:', name, email);

        // Check if the email already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
          console.log('Email already exists');
          return res.status(400).json({ error: 'Email já existe' });
        }

        const userId = await createUser(name, email, passwordPlain);
        console.log('User created successfully with ID:', userId);
        res.status(201).json({ message: 'User created successfully', userId });
      } catch (error) {
        console.error('Failed to create user', error);
        res.status(500).json({ error: 'Failed to create user' });
      }
    });

    app.post('/login', async (req, res) => {
      console.log('Received login request');
      try {
        const { email, passwordPlain } = req.body;
        console.log('Logging in user:', email);
        const user = await getUserByEmail(email);

        if (!user) {
          console.log('User not found');
          return res.status(401).json({ error: 'Nome de usuário ou senha incorretos' });
        }

        const passwordMatch = await verifyPassword(passwordPlain, user.passwordHash);

        if (!passwordMatch) {
          console.log('Password does not match');
          return res.status(401).json({ error: 'Nome de usuário ou senha incorretos' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful', user);
        res.json({ message: 'Login successful', user, token: token });
      } catch (error) {
        console.error('Failed to login', error);
        res.status(500).json({ error: 'Failed to login' });
      }
    });

    app.get('/users', async (req, res) => {
      const db = await openDb();
      try {
        const users = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
              console.error('Failed to get all users', err);
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
        res.json(users);
      } catch (e) {
        console.error('Failed to get all users', e);
        res.status(500).json({ error: 'Failed to get all users' });
      }
    });

   app.post('/logout', (req, res) => {
      console.log('Received logout request');
      res.status(200).json({ message: 'Logout successful' });
    });

    app.get('/dbteste', async (req, res) => {
      const db = await openDb();
      try {
        const users = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
              console.error('Failed to get all users', err);
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
        res.json(users);
      } catch (e) {
        console.error('Failed to get all users', e);
        res.status(500).json({ error: 'Failed to get all users' });
      }
    });

    app.get('/profile', verifyToken, async (req, res) => {
      try {
        // The user object is attached to the request by the verifyToken middleware
        const user = req.user;
        console.log('Fetching profile for user:', user);
        res.json({
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio || '',
        });
      } catch (error) {
        console.error('Failed to get profile', error);
        res.status(500).json({ error: 'Failed to get profile' });
      }
    });

    app.delete('/profile', verifyToken, async (req, res) => {
      try {
        const user = req.user;
        console.log('Deleting account for user:', user);
        const db = await openDb();
        await new Promise((resolve, reject) => {
          db.run(`DELETE FROM users WHERE id = ?`, [user.id], (err) => {
            if (err) {
              console.error('Failed to delete user', err);
              reject(err);
            } else {
              console.log('User deleted successfully', user.id);
              resolve(null);
            }
          });
        });
        const { password } = req.body;
        const passwordMatch = await verifyPassword(password, user.passwordHash);

        if (!passwordMatch) {
          console.log('Password does not match');
          return res.status(401).json({ error: 'Senha incorreta' });
        }

        await new Promise((resolve, reject) => {
          db.run(`DELETE FROM users WHERE id = ?`, [user.id], (err) => {
            if (err) {
              console.error('Failed to delete user', err);
              reject(err);
            } else {
              console.log('User deleted successfully', user.id);
              resolve(null);
            }
          });
        });
        res.status(200).json({ message: 'Account deleted successfully' });
      } catch (error) {
        console.error('Failed to delete account', error);
        res.status(500).json({ error: 'Failed to delete account' });
      }
    });

    app.listen(port, () => {
      console.log(`Backend server listening on port ${port}`);
      console.log(`BACKEND_PORT=${port}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use. Trying another port...`);
        port++;
        app.listen(port, () => {
          console.log(`Backend server listening on port ${port}`);
        }).on('error', (err) => {
          console.error('Failed to run main function', err);
        });
      } else {
        console.error('Failed to run main function', err);
      }
    });
  } catch (e) {
    console.error('Failed to run main function', e);
  } finally {
    console.log('Backend server started');
  }
}

main();
