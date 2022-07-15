import { Router } from 'express';
import authenticator from '../middlewares/auth';
import SaleReportController from '../controllers/saleReport';

const router = Router();
const controller = new SaleReportController();

router
	.route('/')
	.get(authenticator, controller.getSaleReports)
	.post(authenticator, controller.createSaleReport);

router
	.route('/:id')
	.get(authenticator, controller.getSaleReport)
	.delete(authenticator, controller.deleteSaleReport);

export { router as salesReportRoutes };
