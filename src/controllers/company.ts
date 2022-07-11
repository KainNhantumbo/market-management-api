import Company from '../models/company';
import { Request, Response } from 'express';

export default class CompanyController {
	async getCompany(req: Request, res: Response): Promise<void> {
		try {
			const company_id = Number(req.params.id);
			if (!company_id) {
				res.status(400).json({ message: 'Provided company ID is invalid.' });
				return;
			}
			const company_details = await Company.findOne({
				where: { id: company_id },
			});
			if (!company_details) {
				res
					.status(404)
					.json({
						message: `Company details data with ID:[${company_id}], was not found.`,
					});
				return;
			}
			res.status(200).json({ data: company_details });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
	async createtCompany(req: Request, res: Response): Promise<void> {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}
	async updateCompany(req: Request, res: Response): Promise<void> {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
