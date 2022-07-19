import { Router } from 'express';
import SaleReportController from '../controllers/saleReport';
import use from '../utils/async-wrapper';

const router = Router();
const controller = new SaleReportController();

router
	.route('/')
	.get(use(controller.getSaleReports))
	.post(use(controller.createSaleReport));

router
	.route('/:id')
	.get(use(controller.getSaleReport))
	.delete(use(controller.deleteSaleReport));

export { router as salesReportRoutes };
