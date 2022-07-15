import { Router } from 'express';
import CategoriesController from '../controllers/categories';
import authenticator from '../middlewares/auth';

const router = Router();
const controller = new CategoriesController();

router
	.route('/')
	.get(authenticator, controller.getCategories)
	.post(authenticator, controller.createCategory);
router
	.route('/:id')
	.get(authenticator, controller.getCategory)
	.patch(authenticator, controller.updateCategory)
	.delete(authenticator, controller.deleteCategory);

export { router as categoriesRoutes };