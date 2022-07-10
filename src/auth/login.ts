import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import brypt from 'bcrypt';
import User  from '../models/User';
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

// login the user in the system
const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			res.status(400).json({
				message: 'Username and password must be provided for authentication.',
			});
			return;
		}
		const user = User.findOne({ where: { user_name: username } });
		if (!user) {
			res
				.status(404)
				.json({ message: 'User with provided username not found.' });
			return;
		}
    // password lookup for match
		const match = await brypt.compare(password, (user as any).password);
		if (!match) {
			res.status(401).json({ message: 'Wrong password. Check and try again.' });
		}
		const token = await createToken({ id: (user as any).id, name: username });
		res
			.status(200)
			.json({ user: { id: (user as any).id, name: username }, token });
	} catch (err) {
		res.status(500).json({ err });
	}
};

export default login;
