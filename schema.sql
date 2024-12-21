--todo18
CREATE TABLE IF NOT EXISTS todo18 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
--todo19
CREATE TABLE IF NOT EXISTS todo19 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  public_type TEXT,
  food_orange INTEGER,
  food_apple INTEGER,
  food_banana INTEGER,
  pub_date1 TEXT,
  pub_date2 TEXT,
  pub_date3 TEXT,
  qty1 TEXT,
  qty2 TEXT,
  qty3 TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
---todo20
CREATE TABLE  todo20 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    createdAt TEXT,
    updatedAt TEXT
);