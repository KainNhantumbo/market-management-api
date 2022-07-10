import User from '../models/User';
import { Request, Response } from 'express';

export default class UserController {
	async getUsers(req: Request, res: Response) {
		try {
			const users = await User.findAll({});
			res.status(200).json({ results: users.length, data: users });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
	async getUser(req: Request, res: Response) {
		try {
			const user_id = req.params.id;
			if (!user_id) {
				res.status(400).json({ message: 'Invalid user ID.' });
				return;
			}
			const user = await User.findOne({ where: { id: user_id } });
			if (!user) {
				res
					.status(404)
					.json({ message: `User with provided ID [${user_id}] not found.` });
				return;
			}
			res.status(200).json({ data: user });
		} catch (err) {
			res.status(500).json({ err });
		}
	}
	async updateUser(req: Request, res: Response) {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}
	async deleteUser(req: Request, res: Response) {
		try {
		} catch (err) {
			res.status(500).json({ err });
		}
	}
}
