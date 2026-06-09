import { enrollmentsService } from '../services/enrollmentsService.js';
import { enrollmentSchema } from '../validations/enrollmentSchemas.js';

export const enrollmentsController = {
  async list(req, res, next) {
    try {
      res.json(await enrollmentsService.list(req.query.class_id));
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const data = enrollmentSchema.parse(req.body);
      res.status(201).json(await enrollmentsService.create(data));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = enrollmentSchema.parse(req.body);
      res.json(await enrollmentsService.update(req.params.id, data));
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await enrollmentsService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
