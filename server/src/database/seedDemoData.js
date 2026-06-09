import bcrypt from 'bcryptjs';
import { pool } from './connection.js';

const defaultPassword = '123456';
const TOTAL_STUDENTS = 500;
const TOTAL_TEACHERS = 40;
const TOTAL_CLASSES = 30;

const secretaryUser = {
  id: '11111111-1111-4111-8111-111111111111',
  name: 'Secretaria Academica',
  email: 'secretaria@uniesbam.edu.br',
  role: 'SECRETARIA'
};

const baseTeachers = [
  ['Maria Oliveira', 'maria.oliveira@uniesbam.edu.br', '(92) 98111-1001', 'Mestre em Engenharia de Software'],
  ['Joao Souza', 'joao.souza@uniesbam.edu.br', '(92) 98111-1002', 'Especialista em Banco de Dados'],
  ['Ana Costa', 'ana.costa@uniesbam.edu.br', '(92) 98111-1003', 'Doutora em Educacao'],
  ['Carlos Almeida', 'carlos.almeida@uniesbam.edu.br', '(92) 98111-1004', 'Mestre em Administracao'],
  ['Beatriz Lima', 'beatriz.lima@uniesbam.edu.br', '(92) 98111-1005', 'Especialista em Saude Coletiva']
];

const firstNames = [
  'Aline', 'Amanda', 'Arthur', 'Bianca', 'Caio', 'Carolina', 'Cecilia', 'Daniel',
  'Eduarda', 'Eduardo', 'Felipe', 'Gabriela', 'Gustavo', 'Helena', 'Igor', 'Isabela',
  'Joana', 'Leticia', 'Leonardo', 'Manuela', 'Marcelo', 'Natasha', 'Otavio', 'Priscila',
  'Renan', 'Sabrina', 'Thiago', 'Valeria', 'Vitor', 'Yasmin'
];

const lastNames = [
  'Andrade', 'Araujo', 'Assuncao', 'Batista', 'Bentes', 'Cardoso', 'Castro', 'Cavalcante',
  'Correia', 'Dias', 'Farias', 'Freitas', 'Leal', 'Lopes', 'Macedo', 'Marques',
  'Medeiros', 'Monteiro', 'Nogueira', 'Pereira', 'Pinto', 'Queiroz', 'Ramos', 'Reis',
  'Ribeiro', 'Sales', 'Santana', 'Tavares', 'Teixeira', 'Vieira'
];

const degrees = [
  'Especialista em Docencia do Ensino Superior',
  'Mestre em Gestao Educacional',
  'Mestre em Engenharia de Software',
  'Doutor em Ciencias da Educacao',
  'Especialista em Metodologias Ativas'
];

const courses = [
  'Analise e Desenvolvimento de Sistemas',
  'Administracao',
  'Pedagogia',
  'Enfermagem',
  'Ciencias Contabeis',
  'Gestao de Recursos Humanos'
];

const subjects = [
  'Backend I', 'Banco de Dados', 'Frontend com React', 'Engenharia de Software',
  'Gestao de Projetos', 'Empreendedorismo', 'Didatica Geral', 'Psicologia da Educacao',
  'Saude Coletiva', 'Anatomia Humana', 'Contabilidade Geral', 'Legislacao Trabalhista',
  'Matematica Aplicada', 'Estatistica', 'Arquitetura de Computadores', 'Redes de Computadores',
  'Marketing Digital', 'Logistica Empresarial', 'Etica Profissional', 'Pesquisa Academica',
  'Programacao Orientada a Objetos', 'Analise de Sistemas', 'Gestao Financeira',
  'Planejamento Estrategico', 'Educacao Inclusiva', 'Farmacologia', 'Auditoria Contabil',
  'Rotinas de Pessoal', 'Seguranca da Informacao', 'Projeto Integrador'
];

const shifts = ['MATUTINO', 'VESPERTINO', 'NOTURNO', 'INTEGRAL'];
const statuses = ['ATIVO', 'ATIVO', 'ATIVO', 'ATIVO', 'TRANCADO', 'INATIVO'];

function demoUuid(prefix, number) {
  const firstGroup = `${prefix}${String(number).padStart(4, '0')}`;
  const suffix = String(number).padStart(12, '0');
  return `${firstGroup}-0000-4000-8000-${suffix}`;
}

function slug(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/(^\.|\.$)/g, '');
}

function uniquePersonName(number, title = '') {
  const first = firstNames[(number - 1) % firstNames.length];
  const last = lastNames[(number - 1) % lastNames.length];
  const secondLast = lastNames[(number + 10) % lastNames.length];
  const suffix = String(number).padStart(3, '0');
  return `${title}${first} ${last} ${secondLast} ${suffix}`.trim();
}

function buildTeachers() {
  const teachers = baseTeachers.map(([name, email, phone, degree], index) => {
    const number = index + 1;
    return {
      id: demoUuid('aaaa', number),
      userId: demoUuid('2222', number),
      name: name.startsWith('Prof') ? name : `${number === 3 || number === 5 ? 'Profa.' : 'Prof.'} ${name}`,
      email,
      phone,
      degree
    };
  });

  for (let number = teachers.length + 1; number <= TOTAL_TEACHERS; number += 1) {
    const name = uniquePersonName(number, number % 2 === 0 ? 'Prof. ' : 'Profa. ');
    teachers.push({
      id: demoUuid('aaaa', number),
      userId: demoUuid('2222', number),
      name,
      email: `professor${String(number).padStart(3, '0')}@uniesbam.edu.br`,
      phone: `(92) 98111-${String(number).padStart(4, '0')}`,
      degree: degrees[number % degrees.length]
    });
  }

  return teachers;
}

function buildStudents() {
  const students = [];

  for (let number = 1; number <= TOTAL_STUDENTS; number += 1) {
    const name = uniquePersonName(number);
    const registration = `2026${String(number).padStart(4, '0')}`;
    const birthMonth = String((number % 12) + 1).padStart(2, '0');
    const birthDay = String((number % 28) + 1).padStart(2, '0');
    const status = statuses[number % statuses.length];

    students.push([
      demoUuid('bbbb', number),
      registration,
      name,
      `${slug(name)}@email.com`,
      `(92) 99200-${String(number).padStart(4, '0')}`,
      `200${number % 6}-${birthMonth}-${birthDay}`,
      status
    ]);
  }

  return students;
}

function buildClasses(teachers) {
  const classes = [];

  for (let number = 1; number <= TOTAL_CLASSES; number += 1) {
    const course = courses[(number - 1) % courses.length];
    const subject = subjects[(number - 1) % subjects.length];
    const semester = number <= 15 ? '2026.1' : '2026.2';
    const shift = shifts[(number - 1) % shifts.length];
    const coursePrefix = course
      .split(' ')
      .filter((word) => word.length > 2)
      .slice(0, 3)
      .map((word) => word[0])
      .join('')
      .toUpperCase();

    classes.push([
      demoUuid('cccc', number),
      `${coursePrefix}-2026-${String(number).padStart(2, '0')}`,
      subject,
      course,
      semester,
      shift,
      teachers[(number - 1) % teachers.length].email
    ]);
  }

  return classes;
}

function buildEnrollments(students, classes) {
  const enrollments = [];
  let enrollmentNumber = 1;

  for (let index = 0; index < students.length; index += 1) {
    const registration = students[index][1];
    const mainClass = classes[index % classes.length][1];
    const status = index % 29 === 0 ? 'CANCELADO' : index % 19 === 0 ? 'APROVADO' : 'MATRICULADO';

    enrollments.push([demoUuid('eded', enrollmentNumber), registration, mainClass, status]);
    enrollmentNumber += 1;

    if (index < 180) {
      const extraClass = classes[(index + 7) % classes.length][1];
      enrollments.push([demoUuid('eded', enrollmentNumber), registration, extraClass, 'MATRICULADO']);
      enrollmentNumber += 1;
    }
  }

  return enrollments;
}

const teachers = buildTeachers();
const students = buildStudents();
const classes = buildClasses(teachers);
const enrollments = buildEnrollments(students, classes);
const demoUsers = [
  secretaryUser,
  ...teachers.map((teacher) => ({
    id: teacher.userId,
    name: teacher.name,
    email: teacher.email,
    role: 'PROFESSOR'
  }))
];

export async function seedDemoData() {
  const passwordHash = await bcrypt.hash(defaultPassword, 10);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const user of demoUsers) {
      await client.query(
        `INSERT INTO users (id, name, email, password_hash, role, active)
         VALUES ($1, $2, $3, $4, $5, true)
         ON CONFLICT (email) DO UPDATE
         SET name = EXCLUDED.name, role = EXCLUDED.role, active = true, updated_at = now()`,
        [user.id, user.name, user.email, passwordHash, user.role]
      );
    }

    for (const teacher of teachers) {
      await client.query(
        `INSERT INTO teachers (id, user_id, name, email, phone, degree, active)
         VALUES ($1, (SELECT id FROM users WHERE email = $2), $3, $4, $5, $6, true)
         ON CONFLICT (email) DO UPDATE
         SET user_id = EXCLUDED.user_id, name = EXCLUDED.name, phone = EXCLUDED.phone,
             degree = EXCLUDED.degree, active = true, updated_at = now()`,
        [teacher.id, teacher.email, teacher.name, teacher.email, teacher.phone, teacher.degree]
      );
    }

    for (const student of students) {
      await client.query(
        `INSERT INTO students (id, registration, name, email, phone, birth_date, status)
         VALUES ($1, $2, $3, $4, $5, $6::date, $7)
         ON CONFLICT (registration) DO UPDATE
         SET name = EXCLUDED.name, email = EXCLUDED.email, phone = EXCLUDED.phone,
             birth_date = EXCLUDED.birth_date, status = EXCLUDED.status, updated_at = now()`,
        student
      );
    }

    for (const classItem of classes) {
      const [id, code, name, course, semester, shift, teacherEmail] = classItem;
      await client.query(
        `INSERT INTO classes (id, code, name, course, semester, shift, teacher_id, active)
         VALUES ($1, $2, $3, $4, $5, $6, (SELECT id FROM teachers WHERE email = $7), true)
         ON CONFLICT (code) DO UPDATE
         SET name = EXCLUDED.name, course = EXCLUDED.course, semester = EXCLUDED.semester,
             shift = EXCLUDED.shift, teacher_id = EXCLUDED.teacher_id, active = true, updated_at = now()`,
        [id, code, name, course, semester, shift, teacherEmail]
      );
    }

    for (const enrollment of enrollments) {
      const [id, studentRegistration, classCode, status] = enrollment;
      await client.query(
        `INSERT INTO enrollments (id, student_id, class_id, status)
         VALUES (
           $1,
           (SELECT id FROM students WHERE registration = $2),
           (SELECT id FROM classes WHERE code = $3),
           $4
         )
         ON CONFLICT (student_id, class_id) DO UPDATE
         SET status = EXCLUDED.status, updated_at = now()`,
        [id, studentRegistration, classCode, status]
      );
    }

    for (const [index, enrollment] of enrollments.entries()) {
      const [, studentRegistration, classCode] = enrollment;
      const enrollmentResult = await client.query(
        `SELECT e.id
         FROM enrollments e
         JOIN students s ON s.id = e.student_id
         JOIN classes c ON c.id = e.class_id
         WHERE s.registration = $1 AND c.code = $2`,
        [studentRegistration, classCode]
      );
      const enrollmentId = enrollmentResult.rows[0].id;
      const base = 6.2 + (index % 7) * 0.45;
      const grades = [
        [`fafa${String(index + 1).padStart(4, '0')}-1111-4eee-8eee-eeeeeeeeeee1`, enrollmentId, 'Nota 1', base, 1],
        [`fafa${String(index + 1).padStart(4, '0')}-2222-4eee-8eee-eeeeeeeeeee2`, enrollmentId, 'Nota 2', Math.min(base + 0.9, 10), 1]
      ];

      for (const grade of grades) {
        await client.query(
          `INSERT INTO grades (id, enrollment_id, label, value, weight)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (id) DO UPDATE
           SET label = EXCLUDED.label, value = EXCLUDED.value, weight = EXCLUDED.weight, updated_at = now()`,
          grade
        );
      }
    }

    await client.query('COMMIT');
    console.log(
      `Seed de dados demonstrativos aplicado: ${students.length} alunos, ${teachers.length} professores, ${classes.length} turmas.`
    );
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export const demoCredentials = {
  secretaria: 'secretaria@uniesbam.edu.br',
  professor: 'maria.oliveira@uniesbam.edu.br',
  password: defaultPassword
};
