import { Router } from 'express';
import employeeRouter from './employee.route.ts';
import authRouter from './auth.route.ts';
import pokemonRouter from './pokemon.route.ts';

const router = Router();

router.use(authRouter);
router.use(employeeRouter);
router.use(pokemonRouter);

export default router;
