import { Router } from 'express';
import ProductsController from '../controllers/products';
import authenticator from '../middlewares/auth';

const controller = new ProductsController();
const router = Router();

router
	.route('/')
	.get(authenticator, controller.getProducts)
	.post(authenticator, controller.createProduct);

router
	.route('/:id')
	.get(authenticator, controller.getProduct)
	.patch(authenticator, controller.updateProduct)
	.delete(authenticator, controller.deleteProduct);

export { router as productsRoutes };
