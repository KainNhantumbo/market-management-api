import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { Response, Request } from 'express';

// loads environment variables
config();

interface PayloadProps {
	name: string;
	id: number;
}

/**
 * @param payload Object that must contain user id and name
 * @returns token
 */
const createToken = async (payload: PayloadProps) =>
	new Promise((resolve) => {
		const secret = process.env.JWT_SECRET || '';
		const token = jwt.sign({ id: payload.id, name: payload.name }, secret, {
			expiresIn: process.env.JWT_EXPDATE,
		});
		resolve(token);
	});

// login the user in the system
const login = async (req: Request, res: Response) => {
	try {
		const { user_name, password } = req.body;
		if (!user_name || !password) {
			return res.status(400).json({
				message: 'User name and password must be provided for authentication.',
			});
		}
		const user = await User.findOne({ where: { user_name: user_name } });
		if (!user) {
			return res
				.status(404)
				.json({ message: 'User with provided username not found.' });
		}
		// password lookup for match
		const match = await bcrypt.compare(password, (user as any).password);
		if (!match) {
			return res
				.status(401)
				.json({ message: 'Wrong password. Check and try again.' });
		}
		const token = await createToken({ id: (user as any).id, name: user_name });
		res
			.status(200)
			.json({ user: { id: (user as any).id, name: user_name }, token });
	} catch (err) {
		res.status(500).json({ err });
	}
};

export default login;
