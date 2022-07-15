import { Router } from 'express';
import EmployeesController from '../controllers/employees';
import authenticator from '../middlewares/auth';

const router = Router();
const controller = new EmployeesController();

router
	.route('/')
	.get(authenticator, controller.getAllEmployees)
	.post(authenticator, controller.createEmployee);

router
	.route('/:id')
	.get(authenticator, controller.getEmployee)
	.patch(authenticator, controller.updateEmployee)
	.delete(authenticator, controller.deleteEmployee);

export { router as employeesRoutes };
