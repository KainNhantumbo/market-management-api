import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import BaseError from './base-error';

const handleError = (err: any, res: Response) => {
	const { statusCode, message } = err;
	return res.status(statusCode).json({
		code: statusCode,
		message,
	});
};

/**
 * Error handler middleware.
 * @param error error
 * @param req request
 * @param res response
 * @param next next middleware Function
 */
const errorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof BaseError) return handleError(error, res);

	if (error instanceof JsonWebTokenError)
		return res.status(403).json({
			status: 'Authorization Error',
			code: 403,
			message: 'Unauthorized: invalid token.',
		});

	if (error.name == 'SequelizeUniqueConstraintError')
		return res.status(409).json({ message: error.errors[0]?.message });

	if (error.errors[0]?.type === 'Validation error')
		return res.status(400).json({
			status: 'Bad Request',
			code: 400,
			message: error.errors[0].message,
		});

	console.log(error); // for development only

	res.status(500).json({
		status: 'Internal Server Error',
		code: 500,
		message: 'An error occured while processing your request.',
	});
};

export default errorHandler;
