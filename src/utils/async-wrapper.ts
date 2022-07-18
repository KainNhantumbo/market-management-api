import { Request, Response, NextFunction } from 'express';

/**
 * Wrapper function for global error handling.
 * @param fn caller function for global error handling
 * @returns Promise
 */
export default function use(fn: any) {
	return (req: Request, res: Response, next: NextFunction) =>
		Promise.resolve(fn(req, res, next)).catch(next);
}
