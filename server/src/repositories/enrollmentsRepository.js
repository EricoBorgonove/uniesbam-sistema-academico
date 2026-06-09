import { query } from '../database/connection.js';

export const enrollmentsRepository = {
  findAll(classId = null) {
    return query(
      `SELECT e.*, s.name AS student_name, s.registration, c.name AS class_name, c.code AS class_code,
              COALESCE(ROUND(SUM(g.value * g.weight) / NULLIF(SUM(g.weight), 0), 2), 0)::float AS average
       FROM enrollments e
       JOIN students s ON s.id = e.student_id
       JOIN classes c ON c.id = e.class_id
       LEFT JOIN grades g ON g.enrollment_id = e.id
       WHERE ($1::uuid IS NULL OR e.class_id = $1::uuid)
       GROUP BY e.id, s.name, s.registration, c.name, c.code
       ORDER BY c.name, s.name`,
      [classId]
    );
  },

  create(data) {
    return query(
      `INSERT INTO enrollments (student_id, class_id, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.student_id, data.class_id, data.status]
    );
  },

  update(id, data) {
    return query(
      `UPDATE enrollments
       SET student_id = $1, class_id = $2, status = $3, updated_at = now()
       WHERE id = $4
       RETURNING *`,
      [data.student_id, data.class_id, data.status, id]
    );
  },

  delete(id) {
    return query('DELETE FROM enrollments WHERE id = $1', [id]);
  }
};
