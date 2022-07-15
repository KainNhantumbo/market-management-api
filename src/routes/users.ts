import { Router } from 'express';
import UserController from '../controllers/users';

const router = Router();
const controller = new UserController();

router
	.route('/:id')
	.get(controller.getUser)
	.patch(controller.updateUser)
	.delete(controller.deleteUser);

export { router as userRoutes };
