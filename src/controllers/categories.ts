import Category from '../models/Category';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import BaseError from '../errors/base-error';

export default class CategoriesController {
	async getCategories(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const categories = await Category.findAll({
			where: { createdBy: user_ref },
		});
		res.status(200).json({ results: categories.length, data: categories });
	}

	async getCategory(req: Request, res: Response): ControllerResponse {
		const category_id = Number.parseInt(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!category_id)
			throw new BaseError('Provided category ID is invalid.', 400);
		const category = await Category.findOne({
			where: { id: category_id, createdBy: user_ref },
		});
		if (!category)
			throw new BaseError(
				`No category with ID:[${category_id}] was found.`,
				404
			);
		res.status(200).json({ data: category });
	}

	async createCategory(req: Request, res: Response): ControllerResponse {
		const new_category = req.body;
		new_category.createdBy = (req as any).user.ref;
		if (!new_category)
			throw new BaseError('No data received to save category.', 400);
		await Category.create({ ...new_category }, { returning: false });
		res.status(201).json({ message: 'Category saved successfuly.' });
	}

	async updateCategory(req: Request, res: Response): ControllerResponse {
		const updatedData = req.body;
		const category_id = Number.parseInt(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!category_id)
			throw new BaseError('Provided category ID is invalid.', 400);
		if (!updatedData)
			throw new BaseError('No data received for update operation.', 400);
		await Category.update(
			{ ...updatedData },
			{ where: { id: category_id, createdBy: user_ref }, returning: false }
		);
		res.status(200).json({ message: 'Category updated successfuly.' });
	}

	async deleteCategory(req: Request, res: Response): ControllerResponse {
		const category_id = Number.parseInt(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!category_id)
			throw new BaseError('Provided category ID is invalid.', 400);
		await Category.destroy({
			where: { id: category_id, createdBy: user_ref },
		});
		res.status(200).json({ message: 'Category deleted successfuly.' });
	}
}
