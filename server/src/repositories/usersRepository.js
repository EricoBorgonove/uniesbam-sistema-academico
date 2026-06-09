import { query } from '../database/connection.js';

export const usersRepository = {
  findAll() {
    return query('SELECT id, name, email, role, active, created_at FROM users ORDER BY name');
  },

  findById(id) {
    return query('SELECT * FROM users WHERE id = $1', [id]);
  },

  findByEmail(email) {
    return query(
      'SELECT id, name, email, password_hash, role, active FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
  },

  create(data) {
    return query(
      `INSERT INTO users (name, email, password_hash, role, active)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, role, active, created_at`,
      [data.name, data.email, data.passwordHash, data.role, data.active]
    );
  },

  update(id, data) {
    return query(
      `UPDATE users
       SET name = $1, email = $2, password_hash = $3, role = $4, active = $5, updated_at = now()
       WHERE id = $6
       RETURNING id, name, email, role, active, created_at`,
      [data.name, data.email, data.passwordHash, data.role, data.active, id]
    );
  },

  delete(id) {
    return query('DELETE FROM users WHERE id = $1', [id]);
  }
};
