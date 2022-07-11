import { Router } from 'express';
import CompanyController from '../controllers/company';

const router = Router();
const controller = new CompanyController();

router.route('/').post(controller.createtCompany);
router.route('/:id').get(controller.getCompany).patch(controller.updateCompany);

export { router as companyRoutes };
