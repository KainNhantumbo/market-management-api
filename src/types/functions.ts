import { ControllerResponse } from '../types/controller-responses';
import { Request, Response, NextFunction } from 'express';

export type HandledFunction = (
	req: Request,
	res: Response,
	next: NextFunction
) => ControllerResponse;
