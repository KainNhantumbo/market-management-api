import { Router } from 'express';
import EmployeesController from '../controllers/employees';
import use from '../utils/async-wrapper';

const router = Router();
const controller = new EmployeesController();

router
	.route('/')
	.get(use(controller.getAllEmployees))
	.post(use(controller.createEmployee));

router
	.route('/:id')
	.get(use(controller.getEmployee))
	.patch(use(controller.updateEmployee))
	.delete(use(controller.deleteEmployee));

export { router as employeesRoutes };
