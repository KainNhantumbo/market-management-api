import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { Response, Request } from 'express';
import { ControllerResponse } from '../types/controller-responses';
import { createToken } from '../utils/authentication-functions';

// loads environment variables
config();

// login the user in the system
const login = async (req: Request, res: Response): ControllerResponse => {
	const { user_name, password } = req.body;
	if (!user_name || !password)
		return res.status(400).json({
			message: 'User name and password must be provided for authentication.',
		});
	try {
		const user: any = await User.findOne({ where: { user_name: user_name } });
		if (!user)
			return res
				.status(404)
				.json({ message: 'User with provided username not found.' });
		// password lookup for match
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res
				.status(401)
				.json({ message: 'Wrong password. Check and try again.' });
		}
		const token = await createToken({
			reference: (user as any).reference,
			name: user_name,
		});
		res
			.status(200)
			.json({ user: { ref: user.reference, name: user_name }, token });
	} catch (err) {
		res.status(500).json({ err });
	}
};

export default login;
