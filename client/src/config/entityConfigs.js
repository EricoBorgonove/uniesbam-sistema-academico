export const entityConfigs = {
  users: {
    name: 'Usuario',
    columns: ['name', 'email', 'role', 'active'],
    fields: [
      { name: 'name', label: 'Nome' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Senha', type: 'password', hideOnEdit: true },
      { name: 'role', label: 'Perfil', type: 'select', options: ['ADMIN', 'SECRETARIA', 'PROFESSOR'] },
      { name: 'active', label: 'Ativo', type: 'checkbox' }
    ],
    defaults: { role: 'SECRETARIA', active: true }
  },
  students: {
    name: 'Aluno',
    columns: ['registration', 'name', 'email', 'phone', 'status'],
    fields: [
      { name: 'registration', label: 'Matricula' },
      { name: 'name', label: 'Nome' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Telefone' },
      { name: 'birth_date', label: 'Nascimento', type: 'date' },
      { name: 'status', label: 'Status', type: 'select', options: ['ATIVO', 'INATIVO', 'FORMADO', 'TRANCADO'] }
    ],
    defaults: { status: 'ATIVO' }
  },
  teachers: {
    name: 'Professor',
    columns: ['name', 'email', 'phone', 'degree', 'active'],
    fields: [
      { name: 'name', label: 'Nome' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Telefone' },
      { name: 'degree', label: 'Titulacao' },
      { name: 'active', label: 'Ativo', type: 'checkbox' }
    ],
    defaults: { active: true }
  },
  classes: {
    name: 'Turma',
    columns: ['code', 'name', 'course', 'semester', 'shift', 'teacher_name', 'enrollment_count'],
    fields: [
      { name: 'code', label: 'Codigo' },
      { name: 'name', label: 'Nome' },
      { name: 'course', label: 'Curso' },
      { name: 'semester', label: 'Semestre' },
      { name: 'shift', label: 'Turno', type: 'select', options: ['MATUTINO', 'VESPERTINO', 'NOTURNO', 'INTEGRAL'] },
      { name: 'teacher_id', label: 'Professor', type: 'lookup', source: 'teachers' },
      { name: 'active', label: 'Ativa', type: 'checkbox' }
    ],
    defaults: { shift: 'NOTURNO', active: true }
  },
  enrollments: {
    name: 'Matricula',
    columns: ['registration', 'student_name', 'class_code', 'class_name', 'status', 'average'],
    fields: [
      { name: 'student_id', label: 'Aluno', type: 'lookup', source: 'students' },
      { name: 'class_id', label: 'Turma', type: 'lookup', source: 'classes', labelField: 'name' },
      { name: 'status', label: 'Status', type: 'select', options: ['MATRICULADO', 'APROVADO', 'REPROVADO', 'CANCELADO'] }
    ],
    defaults: { status: 'MATRICULADO' }
  }
};
