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
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async updateProduct(req: Request, res: Response): Promise<void> {
		try {
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
