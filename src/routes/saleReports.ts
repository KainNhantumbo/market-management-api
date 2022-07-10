import { Router } from 'express';
import SaleReportController from '../controllers/saleReport';

const controller = new SaleReportController();
const router = Router();

router
	.route('/')
	.get(controller.getSaleReports)
	.post(controller.createSaleReport);

router
	.route('/:id')
	.get(controller.getSaleReport)
	.delete(controller.deleteSaleReport);

export { router as salesReportRoutes };
