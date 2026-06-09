import { Router } from 'express';
import { gradesController } from '../controllers/gradesController.js';

const router = Router();

router.get('/', gradesController.list);
router.post('/', gradesController.create);
router.put('/:id', gradesController.update);
router.delete('/:id', gradesController.delete);

export default router;
