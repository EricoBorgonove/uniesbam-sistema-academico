import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { usersRepository } from '../repositories/usersRepository.js';
import { HttpError } from '../utils/httpError.js';

export const authService = {
  async login(data) {
    const result = await usersRepository.findByEmail(data.email);
    const user = result.rows[0];

    if (!user || !user.active) {
      throw new HttpError(401, 'Credenciais invalidas.');
    }

    const passwordOk = await bcrypt.compare(data.password, user.password_hash);
    if (!passwordOk) {
      throw new HttpError(401, 'Credenciais invalidas.');
    }

    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(payload, env.jwtSecret, { expiresIn: '8h' });

    return { token, user: payload };
  }
};
