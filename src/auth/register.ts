import User from '../models/User';
import BaseError from '../errors/base-error';
import { config } from 'dotenv';
import { Response, Request } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import { createToken } from '../utils/authentication-functions';

// loads environment variables
config();

// creates a new user account
const createUser = async (req: Request, res: Response): ControllerResponse => {
	const { password, user_name } = req.body;
	if (password.length < 6)
		throw new BaseError('Your password must have at least 6 characteres.', 400);

	if (user_name.length < 8)
		throw new BaseError('User name must have at least 8 characteres.', 400);

	const user: any = await User.create({ ...req.body }, { returning: true });
	const token = await createToken({
		reference: user.reference,
		name: user.user_name,
	});
	res
		.status(201)
		.json({ user: { ref: user.reference, name: user.user_name }, token });
};

export default createUser;
