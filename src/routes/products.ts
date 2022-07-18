import { Router } from 'express';
import ProductsController from '../controllers/products';
import use from '../utils/async-wrapper';

const controller = new ProductsController();
const router = Router();

router
	.route('/')
	.get(use(controller.getProducts))
	.post(use(controller.createProduct));

router
	.route('/:id')
	.get(use(controller.getProduct))
	.patch(use(controller.updateProduct))
	.delete(use(controller.deleteProduct));

export { router as productsRoutes };
