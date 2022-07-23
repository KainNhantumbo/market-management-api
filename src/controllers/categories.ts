import Category from '../models/Category';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import BaseError from '../errors/base-error';
import { Op } from 'sequelize';

interface QueryOptions {
	name?: object;
	createdBy: string;
}

export default class CategoriesController {
	async getCategories(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const query: QueryOptions = { createdBy: user_ref };
		const { search, sort } = req.query;
		const sortBy: any[] = [];

		if (search) {
			query.name = { [Op.iLike]: `%${search}%` };
		}
		if (sort) {
			const sortArr = (sort as string).split(',');
			sortBy.push(sortArr);
		}
		const categories = await Category.findAll({
			where: { ...query },
			order: sortBy.length !== 0 ? sortBy : [['name', 'ASC']],
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
		if (!new_category.name)
			throw new BaseError('Please type category name first.', 400);
		if (!new_category.description)
			throw new BaseError(
				'Please type category description before saving.',
				400
			);
		await Category.create({ ...new_category }, { returning: false });
		res.status(201).json({ message: 'Category saved successfuly.' });
	}

	async updateCategory(req: Request, res: Response): ControllerResponse {
		const { name, description } = req.body;
		const category_id = Number.parseInt(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!category_id)
			throw new BaseError('Provided category ID is invalid.', 400);
		if (!name)
			throw new BaseError('Category name must be filled before update', 400);
		if (!description)
			throw new BaseError(
				'Category description must be filled before update.',
				400
			);
		await Category.update(
			{ name, description },
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
