import { Router } from 'express';
import CompanyController from '../controllers/company';
import authenticator from '../middlewares/auth';

const router = Router();
const controller = new CompanyController();

router
	.route('/')
	.get(authenticator, controller.getCompany)
	.post(authenticator, controller.createCompany)
	.patch(authenticator, controller.updateCompany);

export { router as companyRoutes };
