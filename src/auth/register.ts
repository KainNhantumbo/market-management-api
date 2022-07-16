import User from '../models/User';
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
		return res
			.status(400)
			.json({ message: 'Your password must have at leat 6 characteres.' });

	if (user_name.length < 8)
		return res
			.status(400)
			.json({ message: 'User name must have at leat 8 characteres.' });
	try {
		const user: any = await User.create({ ...req.body }, { returning: true });
		const token = await createToken({
			reference: user.reference,
			name: user.user_name,
		});
		res
			.status(201)
			.json({ user: { ref: user.reference, name: user.user_name }, token });
	} catch (err: any) {
		if (err.name == 'SequelizeUniqueConstraintError')
			return res.status(400).json({ message: err.errors[0].message });

		res.status(500).json({ err });
	}
};

export default createUser;
