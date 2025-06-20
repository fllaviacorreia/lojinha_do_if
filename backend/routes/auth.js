import { Router } from 'express';
const router = Router();
import { registerController, loginController } from '../controller/auth.js';

// 🔓 Rotas públicas
router.post('/register', registerController);
router.post('/login', loginController);

export default router;
