import { Request, Response, NextFunction } from 'express';
import BaseError from './base-error';

const handleError = (err: any, res: Response) => {
	const { statusCode, message } = err;
	return res.status(statusCode).json({
		name: 'error',
		statusCode,
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
	if (error instanceof BaseError) {
		return handleError(error, res);
	}

	if (error.name == 'SequelizeUniqueConstraintError')
		return res.status(409).json({ message: error.errors[0]?.message });

	res.status(500).json({
		status: 'Server error',
		code: 500,
		message: 'An error occured while processing your request.',
	});
};

export default errorHandler;
