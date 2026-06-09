import { query } from '../database/connection.js';

export const teachersRepository = {
  findAll() {
    return query(
      `SELECT t.*, u.role AS user_role
       FROM teachers t
       LEFT JOIN users u ON u.id = t.user_id
       ORDER BY t.name`
    );
  },

  create(data) {
    return query(
      `INSERT INTO teachers (user_id, name, email, phone, degree, active)
       VALUES (NULLIF($1, '')::uuid, $2, $3, NULLIF($4, ''), NULLIF($5, ''), $6)
       RETURNING *`,
      [data.user_id || '', data.name, data.email, data.phone || '', data.degree || '', data.active]
    );
  },

  update(id, data) {
    return query(
      `UPDATE teachers
       SET user_id = NULLIF($1, '')::uuid, name = $2, email = $3, phone = NULLIF($4, ''),
           degree = NULLIF($5, ''), active = $6, updated_at = now()
       WHERE id = $7
       RETURNING *`,
      [data.user_id || '', data.name, data.email, data.phone || '', data.degree || '', data.active, id]
    );
  },

  delete(id) {
    return query('DELETE FROM teachers WHERE id = $1', [id]);
  }
};
