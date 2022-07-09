import { Employee } from '../models/Employees';
import { Request, Response } from 'express';

export default class EmployeesController {
	async getAllEmployees(req: Request, res: Response): Promise<void> {
		try {
			const employees = await Employee.findAll({});
			res.status(200).json({ results: employees.length, data: employees });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async getEmployee(req: Request, res: Response): Promise<void> {
		try {
			const employee_id = Number(req.params.id);
			if (!employee_id) {
				res.status(400).json({ message: 'Provided ID is invalid.' });
				return;
			}
			const employee = await Employee.findOne({ where: { id: employee_id } });
			if (!employee) {
				res
					.status(404)
					.json({ message: `Employee with ${employee_id} not found.` });
				return;
			}
			res.status(200).json({ data: employee });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async createEmployee(req: Request, res: Response): Promise<void> {
		try {
			const new_employee = req.body;
			if (!new_employee) {
				res.status(400).json({ message: 'No data received.' });
				return;
			}
			await Employee.create({ ...new_employee }, { returning: false });
			res.status(201).json({ message: 'Employee created successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
			console.log(err);
		}
	}

	async updateEmployee(req: Request, res: Response): Promise<void> {
		try {
			const updatedData = req.body;
			const employee_id = Number(req.params.id);
			if (!employee_id) {
				res.status(400).json({ message: 'Provided ID is invalid.' });
				return;
			} else if (!updatedData) {
				res
					.status(400)
					.json({ message: 'No data received for this update operation.' });
				return;
			}
			await Employee.update(
				{ ...updatedData },
				{ where: { id: employee_id }, returning: false }
			);
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async deleteEmployee(req: Request, res: Response): Promise<void> {
		try {
			const employee_id = Number(req.params.id);
			if (!employee_id) {
				res.status(400).json({ message: 'Provided ID is invalid.' });
				return;
			}
			await Employee.destroy({ where: { id: employee_id } });
			res.status(200).json({ message: 'Employee data deleted successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
