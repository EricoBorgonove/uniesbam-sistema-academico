import { teachersService } from '../services/teachersService.js';
import { teacherSchema } from '../validations/teacherSchemas.js';

export const teachersController = {
  async list(req, res, next) {
    try {
      res.json(await teachersService.list());
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const data = teacherSchema.parse(req.body);
      res.status(201).json(await teachersService.create(data));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = teacherSchema.parse(req.body);
      res.json(await teachersService.update(req.params.id, data));
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await teachersService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
