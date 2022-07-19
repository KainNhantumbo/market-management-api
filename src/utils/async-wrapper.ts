import type { Request, Response, NextFunction } from 'express';
import type { HandledFunction } from '../types/functions';

/**
 * Wrapper function for global error handling.
 * @param fn asynchronous function to be wrapped and error handled.
 * @returns Promise<...>
 */
export default function use(fn: HandledFunction) {
	return (req: Request, res: Response, next: NextFunction) =>
		Promise.resolve(fn(req, res, next)).catch(next);
}
