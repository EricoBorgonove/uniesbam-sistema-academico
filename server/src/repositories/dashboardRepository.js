import { query } from '../database/connection.js';

export const dashboardRepository = {
  countStudents() {
    return query('SELECT COUNT(*)::int AS total FROM students');
  },

  countTeachers() {
    return query('SELECT COUNT(*)::int AS total FROM teachers WHERE active = true');
  },

  countClasses() {
    return query('SELECT COUNT(*)::int AS total FROM classes WHERE active = true');
  },

  countEnrollments() {
    return query("SELECT COUNT(*)::int AS total FROM enrollments WHERE status = 'MATRICULADO'");
  },

  classAverages() {
    return query(
      `SELECT c.name, COALESCE(ROUND(AVG(avg_table.average), 2), 0)::float AS average
       FROM classes c
       LEFT JOIN (
         SELECT e.class_id, SUM(g.value * g.weight) / NULLIF(SUM(g.weight), 0) AS average
         FROM enrollments e
         LEFT JOIN grades g ON g.enrollment_id = e.id
         GROUP BY e.id
       ) avg_table ON avg_table.class_id = c.id
       GROUP BY c.id
       ORDER BY c.name
       LIMIT 6`
    );
  }
};
