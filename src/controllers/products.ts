import Product from '../models/Product';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';

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
		try {
			const products = await Product.findAll({ where: { createdBy: user_ref } });
			res.status(200).json({ results: products.length, data: products });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async getProduct(req: Request, res: Response): ControllerResponse {
		const product_id = Number(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!product_id)
			return res
				.status(400)
				.json({ message: 'Provided product ID is invalid.' });
		try {
			const product = await Product.findOne({
				where: { id: product_id, createdBy: user_ref },
			});
			if (!product)
				return res
					.status(404)
					.json({ message: `Product with ${product_id} not found.` });
			res.status(200).json({ data: product });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async createProduct(req: Request, res: Response): ControllerResponse {
		const new_product = req.body;
		const user_ref = (req as any).user.ref;
		new_product.createdBy = user_ref;
		if (!new_product)
			return res
				.status(400)
				.json({ message: 'No data received to save a new product.' });
		try {
			await Product.create({ ...new_product }, { returning: false });
			res.status(201).json({ message: 'Product created successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async updateProduct(req: Request, res: Response): ControllerResponse {
		const product_id = Number(req.params.id);
		const user_ref = (req as any).user.ref;
		const updatedProduct = req.body;
		if (!product_id)
			return res
				.status(400)
				.json({ message: 'Provided product ID is invalid.' });
		if (!updatedProduct)
			return res
				.status(400)
				.json({ message: 'No data received for this update operation.' });
		try {
			await Product.update(
				{ ...updatedProduct },
				{ where: { id: product_id, createdBy: user_ref }, returning: false }
			);
			res.status(200).json({ message: 'Product updated successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async deleteProduct(req: Request, res: Response): ControllerResponse {
		const product_id = Number(req.params.id);
		const user_ref = (req as any).user.ref;
		if (!product_id)
			return res
				.status(400)
				.json({ message: 'Provided product ID is invalid.' });
		try {
			await Product.destroy({ where: { id: product_id, createdBy: user_ref } });
			res.status(200).json({ message: 'Product data deleted successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
