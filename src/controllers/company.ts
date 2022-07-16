import Company from '../models/Company';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';

export default class CompanyController {
	async getCompany(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		try {
			const company_details = await Company.findOne({
				where: { createdBy: user_ref },
			});
			res.status(200).json({ data: company_details });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async createCompany(req: Request, res: Response): ControllerResponse {
		const new_company = req.body;
		new_company.createdBy = (req as any).user.ref;
		if (!new_company)
			return res
				.status(400)
				.json({ message: 'No data received to create a company settings.' });
		try {
			await Company.create({ ...new_company }, { returning: false });
			res.status(201).json({ message: 'Company settings saved successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async updateCompany(req: Request, res: Response): ControllerResponse {
		const updatedData = req.body;
		const user_ref = (req as any).user.ref;
		if (!updatedData)
			return res
				.status(400)
				.json({ message: 'No data received for update operation.' });
		try {
			await Company.update(
				{ ...updatedData },
				{ where: { createdBy: user_ref }, returning: false }
			);
			res
				.status(200)
				.json({ message: 'Company settings updated successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
