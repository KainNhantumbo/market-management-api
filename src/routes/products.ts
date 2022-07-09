import { Router } from 'express';
import ProductsController from '../controllers/products';

const controller = new ProductsController();
const router = Router();

router.route('/').get(controller.getProducts).post(controller.createProduct);

router
	.route('/:id')
	.get(controller.getProduct)
	.patch(controller.updateProduct)
	.delete(controller.deleteProduct);

export { router as productsRoutes };
