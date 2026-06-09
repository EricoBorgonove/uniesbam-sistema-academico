import { query } from '../database/connection.js';

export const gradesRepository = {
  findAll(enrollmentId = null) {
    return query(
      `SELECT g.*, s.name AS student_name, c.name AS class_name
       FROM grades g
       JOIN enrollments e ON e.id = g.enrollment_id
       JOIN students s ON s.id = e.student_id
       JOIN classes c ON c.id = e.class_id
       WHERE ($1::uuid IS NULL OR g.enrollment_id = $1::uuid)
       ORDER BY c.name, s.name, g.created_at`,
      [enrollmentId]
    );
  },

  create(data) {
    return query(
      `INSERT INTO grades (enrollment_id, label, value, weight)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.enrollment_id, data.label, data.value, data.weight]
    );
  },

  update(id, data) {
    return query(
      `UPDATE grades
       SET enrollment_id = $1, label = $2, value = $3, weight = $4, updated_at = now()
       WHERE id = $5
       RETURNING *`,
      [data.enrollment_id, data.label, data.value, data.weight, id]
    );
  },

  delete(id) {
    return query('DELETE FROM grades WHERE id = $1', [id]);
  }
};
