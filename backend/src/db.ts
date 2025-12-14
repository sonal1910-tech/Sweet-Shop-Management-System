import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.NODE_ENV === 'test'
  ? ':memory:'
  : path.resolve(__dirname, '../../sweetshop.db');

const db = new Database(dbPath);

export function initDb() {
  // Create tables if not exist

  // Users
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user'
    )
  `);

  // Sweets
  db.exec(`
    CREATE TABLE IF NOT EXISTS sweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL
    )
  `);

  console.log('Database initialized');
}

export default db;
