import { Router } from 'express';
import { usersController } from '../controllers/usersController.js';
import { authorize } from '../middleware/auth.js';

const router = Router();

router.use(authorize('ADMIN'));
router.get('/', usersController.list);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

export default router;
