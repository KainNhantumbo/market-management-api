import { Router } from 'express';
import PurchaseReportController from '../controllers/purchaseReport';

const controller = new PurchaseReportController();
const router = Router();

router
	.route('/')
	.get(controller.getPurchaseReports)
	.post(controller.createPurchaseReport);

router
	.route('/:id')
	.get(controller.getPurchaseReport)
	.delete(controller.deletePurchaseReport);

export { router as purchaseReportRoutes };
