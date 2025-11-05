// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'pandal.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ SQLite DB open error:', err);
  } else {
    console.log('✅ SQLite DB opened:', dbPath);
  }
});

async function initializeTables() {
  try {
    await new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'user',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => err ? reject(err) : resolve());
    });

    await new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS donors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL,
          amount REAL NOT NULL,
          payment_mode TEXT NOT NULL,
          note TEXT,
          recorded_by INTEGER,
          proof TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (recorded_by) REFERENCES users(id)
        )
      `, (err) => err ? reject(err) : resolve());
    });

    await new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS donations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          amount REAL NOT NULL,
          method TEXT NOT NULL,
          proof TEXT,
          note TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `, (err) => err ? reject(err) : resolve());
    });

    console.log('✅ All tables are initialized (SQLite)');
  } catch (err) {
    console.error('❌ Error initializing tables (SQLite):', err);
  }
}

// automatically initialize on startup
initializeTables();

module.exports = db;
