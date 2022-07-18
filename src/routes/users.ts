import { Router } from 'express';
import UserController from '../controllers/users';
import use from '../utils/async-wrapper';

const router = Router();
const controller = new UserController();

router
	.route('/')
	.get(use(controller.getUser))
	.patch(use(controller.updateUser))
	.delete(use(controller.deleteUser));

export { router as userRoutes };
