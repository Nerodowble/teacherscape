// backend/database.ts
import * as sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const dbFile = 'backend/database/database.sqlite';
const saltRounds = 10;

let db: sqlite3.Database | undefined;

function openDb(): Promise<sqlite3.Database> {
  console.log('Opening database');
  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database(dbFile, (err) => {
      if (err) {
        console.error('Failed to open database', err);
        reject(err);
      } else {
        console.log('Database opened successfully');
        database.run('PRAGMA foreign_keys = ON;', (err) => {
          if (err) {
            console.error('Failed to enable foreign keys', err);
            reject(err);
          } else {
            resolve(database);
          }
        });
      }
    });
  });
}

async function initializeDatabase() {
  try {
    db = await openDb();

    await new Promise((resolve, reject) => {
      db!.run(
        `
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
      `,
        (err) => {
          if (err) {
            console.error('Failed to initialize database', err);
            reject(err);
          } else {
            console.log('Database initialized successfully');
            resolve(null);
          }
        }
      );
    });
  } catch (e) {
    console.error('Failed to initialize database', e);
    throw e;
  }
}

async function createUser(name: string, email: string, passwordPlain: string): Promise<string> {
  const database = await openDb();
  const id = uuidv4();
  const passwordHash = await bcrypt.hash(passwordPlain, saltRounds);

  try {
    await new Promise((resolve, reject) => {
      database.run(
        `INSERT INTO users (id, name, email, passwordHash) VALUES (?, ?, ?, ?)`,
        [id, name, email, passwordHash],
        (err) => {
          if (err) {
            console.error('Failed to create user', err);
            reject(err);
          } else {
            console.log('User created successfully', id);
            resolve(id);
          }
        }
      );
    });
    return id;
  } catch (e) {
    console.error('Failed to create user', e);
    throw e;
  } finally {
    await database.close();
  }
}

async function verifyPassword(passwordPlain: string, passwordHash: string): Promise<boolean> {
  console.log('Verifying password');
  return bcrypt.compare(passwordPlain, passwordHash);
}

async function getUserByEmail(email: string): Promise<any> {
  const database = await openDb();

  try {
    return await new Promise((resolve, reject) => {
      database.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (err, row) => {
          if (err) {
            console.error('Failed to get user by email', err);
            reject(err);
          } else {
            console.log('User found', row);
            resolve(row);
          }
        }
      );
    });
  } catch (e) {
    console.error('Failed to get user by email', e);
    throw e;
  } finally {
    await database.close();
  }
}

export { openDb, initializeDatabase, createUser, verifyPassword, getUserByEmail };

// To visualize the database, you can use a VS Code extension like "SQLite Explorer" or "SQLite Viewer".
// 1. Install the extension in VS Code.
// 2. Open the database file (backend/database/database.sqlite) in VS Code.
// 3. Use the extension to browse the tables and data.
