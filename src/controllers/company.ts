import Company from '../models/Company';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import BaseError from '../errors/base-error';

export default class CompanyController {
	async getCompany(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const company_details = await Company.findOne({
			where: { createdBy: user_ref },
		});
		res.status(200).json({ data: company_details });
	}

	async createCompany(req: Request, res: Response): ControllerResponse {
		const new_company = req.body;
		new_company.createdBy = (req as any).user.ref;
		if (!new_company)
			throw new BaseError(
				'No data received to create a company settings.',
				400
			);
		await Company.create({ ...new_company }, { returning: false });
		res.status(201).json({ message: 'Company settings saved successfuly.' });
	}

	async updateCompany(req: Request, res: Response): ControllerResponse {
		const updatedData = req.body;
		const user_ref = (req as any).user.ref;
		if (!updatedData)
			throw new BaseError('No data received for update operation.', 400);
		await Company.update(
			{ ...updatedData },
			{ where: { createdBy: user_ref }, returning: false }
		);
		res.status(200).json({ message: 'Company settings updated successfuly.' });
	}
}
