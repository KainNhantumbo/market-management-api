import { Router } from 'express';
import CompanyController from '../controllers/company';

const router = Router();
const controller = new CompanyController();

router
	.route('/')
	.get(controller.getCompany)
	.post(controller.createCompany)
	.patch(controller.updateCompany);

export { router as companyRoutes };
