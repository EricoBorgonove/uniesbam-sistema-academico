import { Router } from 'express';
import { studentsController } from '../controllers/studentsController.js';

const router = Router();

router.get('/', studentsController.list);
router.post('/', studentsController.create);
router.put('/:id', studentsController.update);
router.delete('/:id', studentsController.delete);

export default router;
