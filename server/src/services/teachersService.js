import { teachersRepository } from '../repositories/teachersRepository.js';
import { HttpError } from '../utils/httpError.js';

export const teachersService = {
  async list() {
    const result = await teachersRepository.findAll();
    return result.rows;
  },

  async create(data) {
    const result = await teachersRepository.create(data);
    return result.rows[0];
  },

  async update(id, data) {
    const result = await teachersRepository.update(id, data);
    if (!result.rowCount) throw new HttpError(404, 'Professor nao encontrado.');
    return result.rows[0];
  },

  async delete(id) {
    await teachersRepository.delete(id);
  }
};
