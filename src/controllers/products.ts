import { Product } from '../models/Product';
import { Request, Response } from 'express';

interface QueryParams {
	order?: string;
	offset?: string;
	limit?: number;
	fields?: string[];
	search?: string;
}

export default class ProductsController {
	async getProducts(req: Request, res: Response): Promise<void> {
		try {
			const { order, offset, limit, fields, search } = req.query;
			const query_params: QueryParams = {};
			const products = await Product.findAll();
			res.status(200).json({ results: products.length, data: products });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async getProduct(req: Request, res: Response): Promise<void> {
		try {
			const product_id = Number(req.params.id);
			if (!product_id) {
				res.status(400).json({ message: 'Provided product id is invalid.' });
				return;
			}
			const product = await Product.findOne({ where: { id: product_id } });
			if (!product) {
				res
					.status(404)
					.json({ message: `Product with ${product_id} not found.` });
				return;
			}
			res.status(200).json({ data: product });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async createProduct(req: Request, res: Response): Promise<void> {
		try {
			const new_product = req.body;
			if (!new_product) {
				res.status(400).json({ message: 'No data received.' });
				return;
			}
			await Product.create({ ...new_product }, { returning: false });
			res.status(201).json({ message: 'Product created successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async updateProduct(req: Request, res: Response): Promise<void> {
		try {
			const product_id = Number(req.params.id);
			const updatedProduct = req.body;
			if (!product_id) {
				res.status(400).json({ message: 'Provided product id is invalid.' });
				return;
			} else if (!updatedProduct) {
				res
					.status(400)
					.json({ message: 'No data received for this update operation.' });
				return;
			}
			await Product.update(
				{ ...updatedProduct },
				{ where: { id: product_id }, returning: false }
			);
			res.status(200).json({ message: 'Product updated successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async deleteProduct(req: Request, res: Response): Promise<void> {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
