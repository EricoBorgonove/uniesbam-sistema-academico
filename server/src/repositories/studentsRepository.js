import { query } from '../database/connection.js';

export const studentsRepository = {
  findAll(search = '') {
    return query(
      `SELECT * FROM students
       WHERE name ILIKE $1 OR registration ILIKE $1 OR COALESCE(email, '') ILIKE $1
       ORDER BY name`,
      [`%${search}%`]
    );
  },

  create(data) {
    return query(
      `INSERT INTO students (registration, name, email, phone, birth_date, status)
       VALUES ($1, $2, NULLIF($3, ''), NULLIF($4, ''), NULLIF($5, '')::date, $6)
       RETURNING *`,
      [data.registration, data.name, data.email || '', data.phone || '', data.birth_date || '', data.status]
    );
  },

  update(id, data) {
    return query(
      `UPDATE students
       SET registration = $1, name = $2, email = NULLIF($3, ''), phone = NULLIF($4, ''),
           birth_date = NULLIF($5, '')::date, status = $6, updated_at = now()
       WHERE id = $7
       RETURNING *`,
      [data.registration, data.name, data.email || '', data.phone || '', data.birth_date || '', data.status, id]
    );
  },

  delete(id) {
    return query('DELETE FROM students WHERE id = $1', [id]);
  }
};
