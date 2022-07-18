import { Router } from 'express';
import CategoriesController from '../controllers/categories';
import use from '../utils/async-wrapper';

const router = Router();
const controller = new CategoriesController();

router
	.route('/')
	.get(use(controller.getCategories))
	.post(use(controller.createCategory));
router
	.route('/:id')
	.get(use(controller.getCategory))
	.patch(use(controller.updateCategory))
	.delete(use(controller.deleteCategory));

export { router as categoriesRoutes };
