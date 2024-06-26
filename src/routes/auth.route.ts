import { Router } from 'express';
import { signup as signupController } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', signupController);

export default router;
