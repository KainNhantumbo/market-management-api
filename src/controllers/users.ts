import User from '../models/User';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types/controller-responses';

export default class UserController {
	async getUser(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		try {
			const user = await User.findOne({
				where: { reference: user_ref },
				attributes: { exclude: ['password'] },
			});
			if (!user)
				return res
					.status(404)
					.json({ message: `User with provided ID [${user_ref}] not found.` });
			res.status(200).json({ data: user });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async updateUser(req: Request, res: Response): ControllerResponse {
		const updatedData = req.body;
		const user_ref = (req as any).user.ref;

		if (!updatedData)
			return res
				.status(400)
				.json({ message: 'No data received for this update operation.' });
		try {
			await User.update(
				{ ...updatedData },
				{ where: { reference: user_ref }, returning: false }
			);
			res.status(200).json({ message: 'User data updated successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}

	async deleteUser(req: Request, res: Response): ControllerResponse {
		const user_ref = (req as any).user.ref;
		try {
			await User.destroy({ where: { reference: user_ref } });
			res.status(200).json({ message: 'User data deleted successfuly.' });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
