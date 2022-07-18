import { Router } from 'express';
import CompanyController from '../controllers/company';
import use from '../utils/async-wrapper';

const router = Router();
const controller = new CompanyController();

router
	.route('/')
	.get(use(controller.getCompany))
	.post(use(controller.createCompany))
	.patch(use(controller.updateCompany));

export { router as companyRoutes };
