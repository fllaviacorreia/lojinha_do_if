import { Router } from 'express';
const router = Router();
import { getAll, getById, create, update, changeStatus } from '../controller/product.js';
import authMiddleware from '../middleware/auth.js';

router.use(authMiddleware);

// CRUD para Products
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.patch('/:id/status', changeStatus);

export default router;
