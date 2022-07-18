import { config } from 'dotenv';
import { Response, NextFunction, Request } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import { verifyToken } from '../utils/authentication-functions';
import use from '../utils/async-wrapper';
import BaseError from '../errors/base-error';

// loads environment variables
config();

// authenticates the user
const authenticator = use(
	async (
		req: Request,
		res: Response,
		next: NextFunction
	): ControllerResponse => {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer '))
			throw new BaseError('Unauthorized: invalid token.', 401);
		const token = authHeader.split(' ')[1];
		const payload: any = await verifyToken(token, process.env.JWT_SECRET || '');
		// inserts user id and user name into request middleware
		(req as any).user = { ref: payload.ref, name: payload.name };
		next();
	}
);

export default authenticator;
