import { enrollmentsRepository } from '../repositories/enrollmentsRepository.js';
import { HttpError } from '../utils/httpError.js';

export const enrollmentsService = {
  async list(classId) {
    const result = await enrollmentsRepository.findAll(classId || null);
    return result.rows;
  },

  async create(data) {
    const result = await enrollmentsRepository.create(data);
    return result.rows[0];
  },

  async update(id, data) {
    const result = await enrollmentsRepository.update(id, data);
    if (!result.rowCount) throw new HttpError(404, 'Matricula nao encontrada.');
    return result.rows[0];
  },

  async delete(id) {
    await enrollmentsRepository.delete(id);
  }
};
