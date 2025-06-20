import { Router } from 'express';
import { getAll, getById, create, update, changeStatus } from '../controller/client.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// CRUD para Clients
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.patch('/:id/status', changeStatus);

export default router;
