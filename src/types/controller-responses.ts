import { Response } from 'express';

export type ControllerResponse =
Promise<void | Response<any, Record<string, any>> | undefined>;
