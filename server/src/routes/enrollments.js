import { Router } from 'express';
import { enrollmentsController } from '../controllers/enrollmentsController.js';

const router = Router();

router.get('/', enrollmentsController.list);
router.post('/', enrollmentsController.create);
router.put('/:id', enrollmentsController.update);
router.delete('/:id', enrollmentsController.delete);

export default router;
