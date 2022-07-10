import PurchaseReport from '../models/PurchaseReport';
import { Request, Response } from 'express';

export default class PurchaseReportController {
	async getPurchaseReports(req: Request, res: Response) {
		try {
			const reports = await PurchaseReport.findAll({});
			res.status(200).json({ results: reports.length, data: reports });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async getPurchaseReport(req: Request, res: Response) {
		try {
			const report_id = Number(req.params.id);
			if (!report_id) {
				res
					.status(400)
					.json({ message: 'Provided purchase report ID is invalid.' });
				return;
			}
			const report = await PurchaseReport.findOne({ where: { id: report_id } });
			if (!report) {
				res.status(404).json({
					message: `Purchase report with provided ID [${report_id}] was not found.`,
				});
				return;
			}
			res.status(200).json({ data: report });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async createPurchaseReport(req: Request, res: Response) {
		try {
			const new_report = req.body;
			if (!new_report) {
				res
					.status(400)
					.json({ message: 'No data received to create a report.' });
				return;
			}
			await PurchaseReport.create({ ...new_report }, { returning: false });
			res.status(201).json({ message: 'Purchase report saved successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
  
	async deletePurchaseReport(req: Request, res: Response) {
		try {
			const report_id = Number(req.params.id);
			if (!report_id) {
				res
					.status(400)
					.json({ message: 'Provided purchase report ID is invalid.' });
				return;
			}
			await PurchaseReport.destroy({ where: { id: report_id } });
			res
				.status(200)
				.json({ message: 'Purchase report data deleted successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}