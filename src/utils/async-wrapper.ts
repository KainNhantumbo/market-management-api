import { Request, Response, NextFunction } from 'express';

/**
 * Wrapper function for global error handling.
 * @param fn function that gets wrapped.
 * @returns Promise
 */
export default function use(fn: any) {
	return (req: Request, res: Response, next: NextFunction) =>
		Promise.resolve(fn(req, res, next)).catch(next);
}
