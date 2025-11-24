// db/db.ts
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dbFile = path.join(process.cwd(), "db", "database.sqlite");

// bikin file db kalau belum ada
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, "");
}

export const db = new Database(dbFile);

// contoh bikin tabel kalau belum ada
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    track_id TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    track_id TEXT,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`).run();
