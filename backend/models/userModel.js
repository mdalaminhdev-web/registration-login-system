import pool from "../config/db.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    "SELECT id, name, email, password, phone, gender, created_at FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0];
}

export async function createUser({ name, email, password, phone, gender }) {
  const [result] = await pool.execute(
    "INSERT INTO users (name, email, password, phone, gender) VALUES (?, ?, ?, ?, ?)",
    [name, email, password, phone, gender]
  );
  return result.insertId;
}

export async function findUserById(id) {
  const [rows] = await pool.execute(
    "SELECT id, name, email, phone, gender, created_at FROM users WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0];
}

export async function getAllUsers() {
  const [rows] = await pool.execute(
    "SELECT id, name, email, phone, gender, created_at FROM users ORDER BY id DESC"
  );
  return rows;
}

export async function getUserCount() {
  const [rows] = await pool.execute("SELECT COUNT(*) AS total FROM users");
  return rows[0].total;
}
