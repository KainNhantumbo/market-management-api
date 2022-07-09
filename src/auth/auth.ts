import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { Response, NextFunction, Request } from 'express';

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
			expiresIn: process.env.JWT_EXP,
		});
		resolve(token);
	});

// a asynchronous function to verify integrity of the token
const verifyToken = (token: string, secret: string) =>
	new Promise((resolve) => {
		const result = jwt.verify(token, secret);
		resolve(result);
	});

const authenticator = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			res.status(400).json({ message: 'Invalid token.' });
			return;
		}
		const token = authHeader.split(' ')[1];
		const payload: any = await verifyToken(token, process.env.JWT_SECRET || '');
		// inserts user object into request middleware
		(req as any).user = { id: payload.id, name: payload.name };
		next();
	} catch (err) {
		res.status(500).json({ err });
	}
};

export default authenticator;
