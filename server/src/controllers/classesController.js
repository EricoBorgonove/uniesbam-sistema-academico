import { classesService } from '../services/classesService.js';
import { classSchema } from '../validations/classSchemas.js';

export const classesController = {
  async list(req, res, next) {
    try {
      res.json(await classesService.list());
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const data = classSchema.parse(req.body);
      res.status(201).json(await classesService.create(data));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = classSchema.parse(req.body);
      res.json(await classesService.update(req.params.id, data));
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await classesService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
