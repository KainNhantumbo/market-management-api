import use from '../utils/async-wrapper';
import createUser from '../auth/register';
import login from '../auth/login';
import { Router } from 'express';

const router = Router();
router.route('/register').post(use(createUser));
router.route('/login').post(use(login));

export { router as authRoutes };
