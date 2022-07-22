import User from '../models/User';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import BaseError from '../errors/base-error';

export default class UserController {
	async getUser(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		const user = await User.findOne({
			where: { reference: user_ref },
			attributes: { exclude: ['password'] },
		});
		res.status(200).json({ data: user });
	}

	async updateUser(req: Request, res: Response): ControllerResponse {
		const updatedData = req.body;
		if (updatedData.password) {
			if (updatedData.password.length < 6) {
				throw new BaseError(
					'The new password must have at least 6 characters.',
					400
				);
			}
		}
		const user_ref = (req as any).user.ref;
		if (!updatedData)
			throw new BaseError('No data received for this update operation.', 400);
		await User.update(
			{ ...updatedData },
			{ where: { reference: user_ref }, returning: false }
		);
		res.status(200).json({ message: 'User data updated successfuly.' });
	}

	async deleteUser(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		await User.destroy({ where: { reference: user_ref } });
		res.status(200).json({ message: 'User data deleted successfuly.' });
	}
}
