import { Router } from 'express';
import UserController from '../controllers/users';
import authenticator from '../middlewares/auth';

const router = Router();
const controller = new UserController();

router
	.route('/:id')
	.get(authenticator, controller.getUser)
	.patch(authenticator, controller.updateUser)
	.delete(authenticator, controller.deleteUser);

export { router as userRoutes };
