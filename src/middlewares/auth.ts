import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { Response, NextFunction, Request } from 'express';

// loads environment variables
config();

interface PayloadProps {
	name: string;
	id: number;
}

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
	} catch (err: any) {
		if (err.message === 'jwt malformed') {
			res
				.status(401)
				.json({ code: 'ERR_BAD_REQUEST', message: 'Invalid authentication.' });
			return;
		}
		res.status(500).json({ err });
	}
};

export default authenticator;
