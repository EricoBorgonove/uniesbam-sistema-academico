import { dashboardRepository } from '../repositories/dashboardRepository.js';

export const dashboardService = {
  async summary() {
    const [students, teachers, classes, enrollments, averages] = await Promise.all([
      dashboardRepository.countStudents(),
      dashboardRepository.countTeachers(),
      dashboardRepository.countClasses(),
      dashboardRepository.countEnrollments(),
      dashboardRepository.classAverages()
    ]);

    return {
      totals: {
        students: students.rows[0].total,
        teachers: teachers.rows[0].total,
        classes: classes.rows[0].total,
        enrollments: enrollments.rows[0].total
      },
      classAverages: averages.rows
    };
  }
};
