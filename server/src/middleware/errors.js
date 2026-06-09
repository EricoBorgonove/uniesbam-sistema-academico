import { ZodError } from 'zod';

export function notFound(req, res) {
  res.status(404).json({ message: 'Rota nao encontrada.' });
}

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Dados invalidos.',
      issues: err.issues
    });
  }

  if (err.code === '23505') {
    return res.status(409).json({ message: 'Registro duplicado.' });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Erro interno do servidor.' });
}
