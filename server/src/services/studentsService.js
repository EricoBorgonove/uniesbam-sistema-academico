import { studentsRepository } from '../repositories/studentsRepository.js';
import { HttpError } from '../utils/httpError.js';

export const studentsService = {
  async list(search) {
    const result = await studentsRepository.findAll(search);
    return result.rows;
  },

  async create(data) {
    const result = await studentsRepository.create(data);
    return result.rows[0];
  },

  async update(id, data) {
    const result = await studentsRepository.update(id, data);
    if (!result.rowCount) throw new HttpError(404, 'Aluno nao encontrado.');
    return result.rows[0];
  },

  async delete(id) {
    await studentsRepository.delete(id);
  }
};
