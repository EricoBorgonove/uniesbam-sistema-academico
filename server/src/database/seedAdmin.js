import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { query } from './connection.js';

export async function ensureAdmin() {
  const existing = await query('SELECT id FROM users WHERE email = $1 LIMIT 1', [env.adminEmail]);

  if (existing.rowCount > 0) return;

  const passwordHash = await bcrypt.hash(env.adminPassword, 10);
  await query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, 'ADMIN')`,
    ['Administrador UNIESBAM', env.adminEmail, passwordHash]
  );
}
