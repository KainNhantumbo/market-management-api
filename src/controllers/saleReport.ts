import SaleReport from '../models/SaleReport';
import { Request, Response } from 'express';

export default class SaleReportController {
	async getSaleReports(req: Request, res: Response) {
		try {
			const reports = await SaleReport.findAll({});
			res.status(200).json({ results: reports.length, data: reports });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async getSaleReport(req: Request, res: Response) {
		try {
			const report_id = Number(req.params.id);
			if (!report_id) {
				res
					.status(400)
					.json({ message: 'Provided sale report ID is invalid.' });
				return;
			}
			const report = await SaleReport.findOne({ where: { id: report_id } });
			if (!report) {
				res.status(404).json({
					message: `Sale report with provided ID [${report_id}] was not found.`,
				});
				return;
			}
			res.status(200).json({ data: report });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async createSaleReport(req: Request, res: Response) {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async deleteSaleReport(req: Request, res: Response) {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
