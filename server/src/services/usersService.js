import bcrypt from 'bcryptjs';
import { usersRepository } from '../repositories/usersRepository.js';
import { HttpError } from '../utils/httpError.js';

export const usersService = {
  async list() {
    const result = await usersRepository.findAll();
    return result.rows;
  },

  async create(data) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const result = await usersRepository.create({ ...data, passwordHash });
    return result.rows[0];
  },

  async update(id, data) {
    const current = await usersRepository.findById(id);
    if (!current.rowCount) throw new HttpError(404, 'Usuario nao encontrado.');

    const user = current.rows[0];
    const passwordHash = data.password ? await bcrypt.hash(data.password, 10) : user.password_hash;
    const result = await usersRepository.update(id, {
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      role: data.role ?? user.role,
      active: data.active ?? user.active,
      passwordHash
    });

    return result.rows[0];
  },

  async delete(id) {
    await usersRepository.delete(id);
  }
};
