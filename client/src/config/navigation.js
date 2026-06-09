import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Home,
  School,
  UserCog,
  Users
} from 'lucide-react';

export const navigationItems = [
  { key: 'dashboard', label: 'Painel', icon: Home },
  { key: 'students', label: 'Alunos', icon: GraduationCap },
  { key: 'teachers', label: 'Professores', icon: School },
  { key: 'classes', label: 'Turmas', icon: BookOpen },
  { key: 'enrollments', label: 'Matriculas', icon: ClipboardList },
  { key: 'grades', label: 'Notas', icon: Users },
  { key: 'users', label: 'Usuarios', icon: UserCog, adminOnly: true }
];

export function titleFor(page) {
  return {
    dashboard: 'Painel academico',
    students: 'Controle de alunos',
    teachers: 'Controle de professores',
    classes: 'Controle de turmas',
    enrollments: 'Matriculas',
    grades: 'Lancamento de notas',
    users: 'Controle de usuarios'
  }[page];
}
