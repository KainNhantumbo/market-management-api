import SaleReport from '../models/SaleReport';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';
export default class SaleReportController {
	async getSaleReports(req: Request, res: Response): ControllerResponse {
		const user_id = (req as any).user.id;
		try {
			const reports = await SaleReport.findAll({
				where: { createdBy: user_id },
			});
			res.status(200).json({ results: reports.length, data: reports });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async getSaleReport(req: Request, res: Response): ControllerResponse {
		const report_id = Number(req.params.id);
		const user_id = (req as any).user.id;
		if (!report_id)
			return res
				.status(400)
				.json({ message: 'Provided sale report ID is invalid.' });
		try {
			const report = await SaleReport.findOne({
				where: { id: report_id, createdBy: user_id },
			});
			if (!report)
				return res.status(404).json({
					message: `Sale report with provided ID [${report_id}] was not found.`,
				});
			res.status(200).json({ data: report });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async createSaleReport(req: Request, res: Response): ControllerResponse {
		const new_report = req.body;
		new_report.createdBy = (req as any).user.id;
		if (!new_report)
			return res
				.status(400)
				.json({ message: 'No data received to save the sale report.' });
		try {
			await SaleReport.create({ ...new_report }, { returning: false });
			res.status(201).json({ message: 'Sale report saved successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async deleteSaleReport(req: Request, res: Response): ControllerResponse {
		const report_id = Number(req.params.id);
		const user_id = (req as any).user.id;
		if (!report_id)
			return res
				.status(400)
				.json({ message: 'Provided sale report ID is invalid.' });
		try {
			await SaleReport.destroy({
				where: { id: report_id, createdBy: user_id },
			});
			res
				.status(200)
				.json({ message: 'Sale report data deleted successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
