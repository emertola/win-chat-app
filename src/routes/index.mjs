import { Router } from 'express';
import employeeRouter from './employee.route.mjs';
import authRouter from './auth.route.mjs';
import pokemonRouter from './pokemon.route.mjs';

const router = Router();

router.use(authRouter);
router.use(employeeRouter);
router.use(pokemonRouter);

export default router;
