import Employee from '../models/Employees';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';

export default class EmployeesController {
	async getAllEmployees(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		try {
			const employees = await Employee.findAll({
				where: { createdBy: user_ref },
			});
			res.status(200).json({ results: employees.length, data: employees });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async getEmployee(req: Request, res: Response): ControllerResponse {
		const employee_id = Number(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!employee_id)
			return res.status(400).json({ message: 'Provided ID is invalid.' });
		try {
			const employee = await Employee.findOne({
				where: { id: employee_id, createdBy: user_ref },
			});
			if (!employee)
				return res.status(404).json({
					message: `Employee with provided ID [${employee_id}] not found.`,
				});
			res.status(200).json({ data: employee });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async createEmployee(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const new_employee = req.body;
		new_employee.createdBy = user_ref;
		if (!new_employee)
			return res
				.status(400)
				.json({ message: 'No data received to create employee.' });
		try {
			await Employee.create({ ...new_employee }, { returning: false });
			res.status(201).json({ message: 'Employee created successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
			console.log(err);
		}
	}

	async updateEmployee(req: Request, res: Response): ControllerResponse {
		const updatedData = req.body;
		const user_ref = (req as any).user.ref;
		const employee_id = Number(req.params.id);
		if (!employee_id)
			return res
				.status(400)
				.json({ message: 'Provided employee ID is invalid.' });
		if (!updatedData)
			return res
				.status(400)
				.json({ message: 'No data received for this update operation.' });
		try {
			await Employee.update(
				{ ...updatedData },
				{ where: { id: employee_id, createdBy: user_ref }, returning: false }
			);
			res.status(200).json({ message: 'Employee data updated successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async deleteEmployee(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const employee_id = Number(req.params.id);
		if (!employee_id)
			return res.status(400).json({ message: 'Provided ID is invalid.' });
		try {
			await Employee.destroy({
				where: { id: employee_id, createdBy: user_ref },
			});
			res.status(200).json({ message: 'Employee data deleted successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
