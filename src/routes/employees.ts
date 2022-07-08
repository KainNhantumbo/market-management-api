import { Router } from 'express';
import EmployeesController from '../controllers/employees';

const router = Router();

const controller = new EmployeesController();

router.route('/').get(controller.getAllEmployees).post(controller.createEmployee);

export { router };
