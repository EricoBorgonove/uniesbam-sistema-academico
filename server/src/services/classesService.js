import { classesRepository } from '../repositories/classesRepository.js';
import { HttpError } from '../utils/httpError.js';

export const classesService = {
  async list() {
    const result = await classesRepository.findAll();
    return result.rows;
  },

  async create(data) {
    const result = await classesRepository.create(data);
    return result.rows[0];
  },

  async update(id, data) {
    const result = await classesRepository.update(id, data);
    if (!result.rowCount) throw new HttpError(404, 'Turma nao encontrada.');
    return result.rows[0];
  },

  async delete(id) {
    await classesRepository.delete(id);
  }
};
