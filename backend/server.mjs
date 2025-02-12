// backend/server.ts
import { initializeDatabase, createUser, verifyPassword, getUserByEmail, openDb } from './database.mjs';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Middleware to verify token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Assuming the token is the user ID
    const user = await getUserByEmail(token);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Failed to verify token', error);
    return res.status(500).json({ error: 'Failed to verify token' });
  }
};

async function main() {
  try {
    await initializeDatabase();

    app.post('/register', async (req, res) => {
      console.log('Received registration request');
      try {
        const { name, email, passwordPlain } = req.body;
        console.log('Creating user:', name, email);
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

        console.log('Login successful', user);
        res.json({ message: 'Login successful', user });
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

    app.get('/profile', verifyToken, async (req, res) => {
      try {
        // The user object is attached to the request by the verifyToken middleware
        const user = req.user;
        console.log('Fetching profile for user:', user);
        res.json({
          name: user.name,
          email: user.email,
          bio: user.profilePicture || 'A brief description about yourself.', // Assuming profilePicture is the bio
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
    });
  } catch (e) {
    console.error('Failed to run main function', e);
  } finally {
    console.log('Backend server started');
  }
}

main();
