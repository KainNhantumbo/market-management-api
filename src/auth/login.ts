import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { Response, Request } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import { createToken } from '../utils/authentication-functions';
import BaseError from '../errors/base-error';

// loads environment variables
config();

// login the user in the system
const login = async (req: Request, res: Response): ControllerResponse => {
	const { user_name, password } = req.body;
	if (!user_name || !password)
		throw new BaseError(
			'User name and password must be provided for authentication.',
			400
		);
	const user: any = await User.findOne({ where: { user_name: user_name } });
	if (!user) throw new BaseError('User with provided username not found.', 404);

	// password lookup for match
	const match = await bcrypt.compare(password, user.password);
	if (!match) throw new BaseError('Wrong password. Check and try again.', 401);

	const token = await createToken({
		reference: (user as any).reference,
		name: user_name,
	});
	res
		.status(200)
		.json({ user: { ref: user.reference, name: user_name }, token });
};

export default login;
