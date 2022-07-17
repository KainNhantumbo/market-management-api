import { Router } from 'express';
import SaleReportController from '../controllers/saleReport';

const router = Router();
const controller = new SaleReportController();

router
	.route('/')
	.get(controller.getSaleReports)
	.post(controller.createSaleReport);

router
	.route('/:id')
	.get(controller.getSaleReport)
	.delete(controller.deleteSaleReport);

export { router as salesReportRoutes };
