import createUser from '../auth/register';
import login from '../auth/login';
import { Router } from 'express';

const router = Router();
router.route('/register').post(createUser);
router.route('/login').post(login);

export { router as authRoutes };
