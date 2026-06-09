import { studentsService } from '../services/studentsService.js';
import { studentSchema } from '../validations/studentSchemas.js';

export const studentsController = {
  async list(req, res, next) {
    try {
      res.json(await studentsService.list(req.query.search));
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const data = studentSchema.parse(req.body);
      res.status(201).json(await studentsService.create(data));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const data = studentSchema.parse(req.body);
      res.json(await studentsService.update(req.params.id, data));
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await studentsService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
