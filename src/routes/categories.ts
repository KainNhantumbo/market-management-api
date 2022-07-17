import { Router } from 'express';
import CategoriesController from '../controllers/categories';

const router = Router();
const controller = new CategoriesController();

router.route('/').get(controller.getCategories).post(controller.createCategory);
router
	.route('/:id')
	.get(controller.getCategory)
	.patch(controller.updateCategory)
	.delete(controller.deleteCategory);

export { router as categoriesRoutes };
