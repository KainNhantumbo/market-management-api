import Employee from '../models/Employees';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import BaseError from '../errors/base-error';

export default class EmployeesController {
	async getAllEmployees(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const employees = await Employee.findAll({
			where: { createdBy: user_ref },
		});
		res.status(200).json({ results: employees.length, data: employees });
	}

	async getEmployee(req: Request, res: Response): ControllerResponse {
		const employee_id = Number.parseInt(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!employee_id) throw new BaseError('Provided ID is invalid.', 400);
		const employee = await Employee.findOne({
			where: { id: employee_id, createdBy: user_ref },
		});
		if (!employee)
			throw new BaseError(
				`Employee with provided ID [${employee_id}] not found.`,
				404
			);
		res.status(200).json({ data: employee });
	}

	async createEmployee(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const new_employee = req.body;
		new_employee.createdBy = user_ref;
		if (!new_employee)
			throw new BaseError('No data received to create employee.', 400);
		await Employee.create({ ...new_employee }, { returning: false });
		res.status(201).json({ message: 'Employee created successfuly.' });
	}

	async updateEmployee(req: Request, res: Response): ControllerResponse {
		const updatedData = req.body;
		const user_ref = (req as any).user.ref;
		const employee_id = Number.parseInt(req.params.id);
		if (!employee_id)
			throw new BaseError('Provided employee ID is invalid.', 400);
		if (!updatedData)
			throw new BaseError('No data received for this update operation.', 400);
		await Employee.update(
			{ ...updatedData },
			{ where: { id: employee_id, createdBy: user_ref }, returning: false }
		);
		res.status(200).json({ message: 'Employee data updated successfuly.' });
	}

	async deleteEmployee(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const employee_id = Number.parseInt(req.params.id);
		if (!employee_id) throw new BaseError('Provided ID is invalid.', 400);
		await Employee.destroy({
			where: { id: employee_id, createdBy: user_ref },
		});
		res.status(200).json({ message: 'Employee data deleted successfuly.' });
	}
}
