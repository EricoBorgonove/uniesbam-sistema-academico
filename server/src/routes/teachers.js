import { Router } from 'express';
import { teachersController } from '../controllers/teachersController.js';

const router = Router();

router.get('/', teachersController.list);
router.post('/', teachersController.create);
router.put('/:id', teachersController.update);
router.delete('/:id', teachersController.delete);

export default router;
