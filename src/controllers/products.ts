import Product from '../models/Product';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import BaseError from '../errors/base-error';

interface QueryParams {
	order?: string;
	offset?: string;
	limit?: number;
	fields?: string[];
	search?: string;
}

export default class ProductsController {
	async getProducts(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const { order, offset, limit, fields, search } = req.query;
		const query_params: QueryParams = {};

		const products = await Product.findAll({
			where: { createdBy: user_ref },
		});
		res.status(200).json({ results: products.length, data: products });
	}

	async getProduct(req: Request, res: Response): ControllerResponse {
		const product_id = Number.parseInt(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!product_id)
			throw new BaseError('Provided product ID is invalid.', 400);
		const product = await Product.findOne({
			where: { id: product_id, createdBy: user_ref },
		});
		if (!product)
			throw new BaseError(`Product with ID:[${product_id}], not found.`, 404);
		res.status(200).json({ data: product });
	}

	async createProduct(req: Request, res: Response): ControllerResponse {
		const new_product = req.body;
		new_product.createdBy = (req as any).user.ref;
		if (!new_product)
			throw new BaseError('No data received to save a new product.', 400);
		await Product.create({ ...new_product }, { returning: false });
		res.status(201).json({ message: 'Product created successfuly.' });
	}

	async updateProduct(req: Request, res: Response): ControllerResponse {
		const product_id = Number.parseInt(req.params.id);
		const user_ref = (req as any).user.ref;
		const updatedProduct = req.body;
		if (!product_id)
			throw new BaseError('Provided product ID is invalid.', 400);
		if (!updatedProduct)
			throw new BaseError('No data received for this update operation.', 400);
		await Product.update(
			{ ...updatedProduct },
			{ where: { id: product_id, createdBy: user_ref }, returning: false }
		);
		res.status(200).json({ message: 'Product updated successfuly.' });
	}

	async deleteProduct(req: Request, res: Response): ControllerResponse {
		const product_id = Number.parseInt(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!product_id)
			throw new BaseError('Provided product ID is invalid.', 400);
		await Product.destroy({ where: { id: product_id, createdBy: user_ref } });
		res.status(200).json({ message: 'Product data deleted successfuly.' });
	}
}
