import { Router } from 'express';
import employeeRouter from './employee.route.mjs';
import authRouter from './auth.route.mjs';

const router = Router();

router.use(authRouter);
router.use(employeeRouter);

export default router;
