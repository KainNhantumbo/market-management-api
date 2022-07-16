import { config } from 'dotenv';
import { Response, NextFunction, Request } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import { verifyToken } from '../utils/authentication-functions';

// loads environment variables
config();

// authenticates the user
const authenticator = async (
	req: Request,
	res: Response,
	next: NextFunction
): ControllerResponse => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer '))
		return res.status(400).json({ message: 'Unauthorized: invalid token.' });
	const token = authHeader.split(' ')[1];
	try {
		const payload: any = await verifyToken(token, process.env.JWT_SECRET || '');
		// inserts user id and user name into request middleware
		(req as any).user = { ref: payload.ref, name: payload.name };
		next();
	} catch (err: any) {
		if (err.message === 'jwt malformed')
			return res.status(401).json({
				code: 'ERR_BAD_REQUEST',
				message: 'Unauthorized: token vitality expired or malformed.',
			});
		res.status(500).json({ err });
	}
};

export default authenticator;
