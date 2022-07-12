import Category from '../models/Category';
import { Request, Response } from 'express';

export default class CategoriesController {
	async getCategories(req: Request, res: Response): Promise<void> {
		try {
			const categories = await Category.findAll({});
			res.status(200).json({ results: categories.length, data: categories });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async getCategory(req: Request, res: Response): Promise<void> {
		try {
			const category_id = Number(req.params.id);
			if (!category_id) {
				res.status(400).json({ message: 'Provided category ID is invalid.' });
				return;
			}
			const category = await Category.findOne({
				where: { id: category_id },
			});
			if (!category) {
				res.status(404).json({
					message: `No category with ID:[${category_id}] was found.`,
				});
				return;
			}
			res.status(200).json({ data: category });
		} catch (err) {
			res.status(500).json({ err });
		}
	}



	async updateCategory(req: Request, res: Response): Promise<void> {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async deleteCategory(req: Request, res: Response): Promise<void> {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
