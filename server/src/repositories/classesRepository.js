import { query } from '../database/connection.js';

export const classesRepository = {
  findAll() {
    return query(
      `SELECT c.*, t.name AS teacher_name, COUNT(e.id)::int AS enrollment_count
       FROM classes c
       LEFT JOIN teachers t ON t.id = c.teacher_id
       LEFT JOIN enrollments e ON e.class_id = c.id AND e.status <> 'CANCELADO'
       GROUP BY c.id, t.name
       ORDER BY c.semester DESC, c.name`
    );
  },

  create(data) {
    return query(
      `INSERT INTO classes (code, name, course, semester, shift, teacher_id, active)
       VALUES ($1, $2, $3, $4, $5, NULLIF($6, '')::uuid, $7)
       RETURNING *`,
      [data.code, data.name, data.course, data.semester, data.shift, data.teacher_id || '', data.active]
    );
  },

  update(id, data) {
    return query(
      `UPDATE classes
       SET code = $1, name = $2, course = $3, semester = $4, shift = $5,
           teacher_id = NULLIF($6, '')::uuid, active = $7, updated_at = now()
       WHERE id = $8
       RETURNING *`,
      [data.code, data.name, data.course, data.semester, data.shift, data.teacher_id || '', data.active, id]
    );
  },

  delete(id) {
    return query('DELETE FROM classes WHERE id = $1', [id]);
  }
};
