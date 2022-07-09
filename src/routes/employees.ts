import { Router } from 'express';
import EmployeesController from '../controllers/employees';

const router = Router();
const controller = new EmployeesController();

router
	.route('/')
	.get(controller.getAllEmployees)
	.post(controller.createEmployee);

router
	.route('/:id')
	.get(controller.getEmployee)
	.patch(controller.updateEmployee)
	.delete(controller.deleteEmployee);

export { router as employeesRoutes };
