import { gradesRepository } from '../repositories/gradesRepository.js';
import { HttpError } from '../utils/httpError.js';

export const gradesService = {
  async list(enrollmentId) {
    const result = await gradesRepository.findAll(enrollmentId || null);
    return result.rows;
  },

  async create(data) {
    const result = await gradesRepository.create(data);
    return result.rows[0];
  },

  async update(id, data) {
    const result = await gradesRepository.update(id, data);
    if (!result.rowCount) throw new HttpError(404, 'Nota nao encontrada.');
    return result.rows[0];
  },

  async delete(id) {
    await gradesRepository.delete(id);
  }
};
