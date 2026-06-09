import { loginSchema } from '../validations/authSchemas.js';
import { authService } from '../services/authService.js';

export const authController = {
  async login(req, res, next) {
    try {
      const data = loginSchema.parse(req.body);
      const session = await authService.login(data);
      res.json(session);
    } catch (err) {
      next(err);
    }
  },

  me(req, res) {
    res.json({ user: req.user });
  }
};
