import { Router } from 'express';
const router = Router();
import { getAll, getById, create, changeStatus } from '../controller/purchases.js';
import authMiddleware from '../middleware/auth.js';

router.use(authMiddleware);

// CRUD para Purchases
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id/status', changeStatus);

export default router;
