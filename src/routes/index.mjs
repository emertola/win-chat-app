import { Router } from 'express';
import employeeRouter from './employee.route.mjs';

const router = Router();

router.use(employeeRouter);

export default router;
