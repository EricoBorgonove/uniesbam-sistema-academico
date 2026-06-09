import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authenticate } from './middleware/auth.js';
import { errorHandler, notFound } from './middleware/errors.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import studentsRoutes from './routes/students.js';
import teachersRoutes from './routes/teachers.js';
import classesRoutes from './routes/classes.js';
import enrollmentsRoutes from './routes/enrollments.js';
import gradesRoutes from './routes/grades.js';
import dashboardRoutes from './routes/dashboard.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // ROTAS DA API
  // O frontend chama essas URLs pelo arquivo client/src/api/frontendApi.js.
  app.get('/api/health', (req, res) => res.json({ status: 'ok', name: 'UNIESBAM API' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/dashboard', authenticate, dashboardRoutes);
  app.use('/api/users', authenticate, usersRoutes);
  app.use('/api/students', authenticate, studentsRoutes);
  app.use('/api/teachers', authenticate, teachersRoutes);
  app.use('/api/classes', authenticate, classesRoutes);
  app.use('/api/enrollments', authenticate, enrollmentsRoutes);
  app.use('/api/grades', authenticate, gradesRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
