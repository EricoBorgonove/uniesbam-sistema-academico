import { dashboardService } from '../services/dashboardService.js';

export const dashboardController = {
  async summary(req, res, next) {
    try {
      res.json(await dashboardService.summary());
    } catch (err) {
      next(err);
    }
  }
};
