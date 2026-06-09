import { gradesService } from '../services/gradesService.js';
import { gradeSchema } from '../validations/gradeSchemas.js';

export const gradesController = {
  async list(req, res, next) {
    try {
      res.json(await gradesService.list(req.query.enrollment_id));
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const data = gradeSchema.parse(req.body);
      res.status(201).json(await gradesService.create(data));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = gradeSchema.parse(req.body);
      res.json(await gradesService.update(req.params.id, data));
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await gradesService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
