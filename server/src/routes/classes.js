import { Router } from 'express';
import { classesController } from '../controllers/classesController.js';

const router = Router();

router.get('/', classesController.list);
router.post('/', classesController.create);
router.put('/:id', classesController.update);
router.delete('/:id', classesController.delete);

export default router;
