import Category from '../models/Category';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';

export default class CategoriesController {
	async getCategories(req: Request, res: Response): ControllerResponse {
		const user_id = (req as any).user.id;
		try {
			const categories = await Category.findAll({
				where: { createdBy: user_id },
			});
			res.status(200).json({ results: categories.length, data: categories });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async getCategory(req: Request, res: Response): ControllerResponse {
		const category_id = Number(req.params.id);
		const user_id = (req as any).user.id;
		if (!category_id)
			return res
				.status(400)
				.json({ message: 'Provided category ID is invalid.' });
		try {
			const category = await Category.findOne({
				where: { id: category_id, createdBy: user_id },
			});
			if (!category)
				return res.status(404).json({
					message: `No category with ID:[${category_id}] was found.`,
				});
			res.status(200).json({ data: category });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async createCategory(req: Request, res: Response): ControllerResponse {
		const new_category = req.body;
		new_category.createdBy = (req as any).user.id;
		if (!new_category)
			return res
				.status(400)
				.json({ message: 'No data received to save category.' });
		try {
			await Category.create({ ...new_category }, { returning: false });
			res.status(201).json({ message: 'Category saved successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async updateCategory(req: Request, res: Response): ControllerResponse {
		const updatedData = req.body;
		const category_id = Number(req.params.id);
		const user_id = (req as any).user.id;
		if (!category_id)
			return res
				.status(400)
				.json({ message: 'Provided category ID is invalid.' });
		if (!updatedData)
			return res
				.status(400)
				.json({ message: 'No data received for update operation.' });
		try {
			await Category.update(
				{ ...updatedData },
				{ where: { id: category_id, createdBy: user_id }, returning: false }
			);
			res.status(200).json({ message: 'Category updated successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async deleteCategory(req: Request, res: Response): ControllerResponse {
		const category_id = Number(req.params.id);
		const user_id = (req as any).user.id;
		if (!category_id)
			return res
				.status(400)
				.json({ message: 'Provided category ID is invalid.' });
		try {
			await Category.destroy({
				where: { id: category_id, createdBy: user_id },
			});
			res.status(200).json({ message: 'Category deleted successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
