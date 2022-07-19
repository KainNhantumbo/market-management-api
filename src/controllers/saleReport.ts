import SaleReport from '../models/SaleReport';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import BaseError from '../errors/base-error';
export default class SaleReportController {
	async getSaleReports(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const reports = await SaleReport.findAll({
			where: { createdBy: user_ref },
		});
		res.status(200).json({ results: reports.length, data: reports });
	}

	async getSaleReport(req: Request, res: Response): ControllerResponse {
		const report_id = Number.parseInt(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!report_id)
			throw new BaseError('Provided sale report ID is invalid.', 400);
		const report = await SaleReport.findOne({
			where: { id: report_id, createdBy: user_ref },
		});
		if (!report)
			throw new BaseError(
				`Sale report with provided ID [${report_id}], was not found.`,
				404
			);
		res.status(200).json({ data: report });
	}

	async createSaleReport(req: Request, res: Response): ControllerResponse {
		const new_report = req.body;
		new_report.createdBy = (req as any).user.ref;
		if (!new_report)
			throw new BaseError('No data received to save the sale report.', 400);
		await SaleReport.create({ ...new_report }, { returning: false });
		res.status(201).json({ message: 'Sale report saved successfuly.' });
	}

	async deleteSaleReport(req: Request, res: Response): ControllerResponse {
		const report_id = Number.parseInt(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!report_id)
			throw new BaseError('Provided sale report ID is invalid.', 400);
		await SaleReport.destroy({
			where: { id: report_id, createdBy: user_ref },
		});
		res.status(200).json({ message: 'Sale report data deleted successfuly.' });
	}
}
