import { usersService } from '../services/usersService.js';
import { createUserSchema, updateUserSchema } from '../validations/userSchemas.js';

export const usersController = {
  async list(req, res, next) {
    try {
      res.json(await usersService.list());
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const data = createUserSchema.parse(req.body);
      res.status(201).json(await usersService.create(data));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = updateUserSchema.parse(req.body);
      res.json(await usersService.update(req.params.id, data));
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await usersService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
