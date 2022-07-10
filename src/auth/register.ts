import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
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
 */
const createToken = async (payload: PayloadProps): Promise<string> =>
	new Promise((resolve) => {
		const secret = process.env.JWT_SECRET || '';
		const token = jwt.sign({ id: payload.id, name: payload.name }, secret, {
			expiresIn: process.env.JWT_EXPDATE,
		});
		resolve(token);
	});

// creates a new user account
const createUser = async (req: Request, res: Response) => {
	try {
		const user: any = await User.create({ ...req.body }, { returning: true });
		const token = await createToken({ id: user.id, name: user.user_name });
		res
			.status(201)
			.json({ user: { id: user.id, name: user.user_name }, token });
	} catch (err) {
		res.status(500).json({ err });
	}
};

export default createUser;
