const { open } = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const databasePath = path.join(__dirname, 'userDetails.db');

const initializeDatabase = async () => {
  const db = await open({
    filename: databasePath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `);

  return db;
};

module.exports = initializeDatabase;
