import { Employee } from '../models/Employees';
import { Request, Response } from 'express';

export default class EmployeesController {
	async getAllEmployees(req: Request, res: Response): Promise<void> {
		try {
			const employees = await Employee.findAll();
			res.status(200).json({ results: employees.length, data: employees });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async getEmployee(req: Request, res: Response): Promise<void> {
		try {
			const employee = await Employee.findOne({ where: { id: req.params.id } });
			if (!employee) {
				res
					.status(404)
					.json({ message: `Employee with ${req.params.id} not found.` });
				return;
			}
			res.status(200).json({ data: employee });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async createEmployee(req: Request, res: Response): Promise<void> {
		try {
			const { firstName, lastName } = req.body;
			const newEmployee = await Employee.create({ firstName, lastName });
			console.log(newEmployee);
			res.status(201).json({ data: newEmployee });
		} catch (err) {
			res.status(500).json({ err });
			console.log(err);
		}
	}

	async updateEmployee(req: Request, res: Response): Promise<void> {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async deleteEmployee(req: Request, res: Response): Promise<void> {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
