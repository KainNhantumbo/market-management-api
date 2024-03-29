import db from '../database/connection';
import { Model, DataTypes, UUIDV4 } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {}
User.init(
	{
		first_name: {
			type: DataTypes.STRING({ length: 50 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter your first name.',
				},
			},
		},
		last_name: {
			type: DataTypes.STRING({ length: 50 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter your last name.',
				},
			},
		},
		email: {
			type: DataTypes.STRING({ length: 50 }),
			allowNull: false,
			validate: {
				isEmail: { msg: 'Please provide a valid e-mail adress.' },
			},
		},
		user_name: {
			type: DataTypes.STRING({ length: 50 }),
			unique: {
				name: 'User name',
				msg: 'User name already taken. Try another one.',
			},
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter your user name.',
				},
			},
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter your password.',
				},
			},
		},
		phone: {
			type: DataTypes.STRING({ length: 30 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter your phone number.',
				},
			},
		},
		adress: {
			type: DataTypes.STRING({ length: 150 }),
			defaultValue: 'No adress provided.',
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter your age.',
				},
			},
		},
		gender: {
			type: DataTypes.STRING({ length: 10 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please select your gender.',
				},
			},
		},
		department: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter your department name.',
				},
			},
		},
		qualification: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter your qualification category.',
				},
			},
		},
		reference: {
			type: DataTypes.UUID(),
			defaultValue: UUIDV4,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Cannot save a user without an reference ID. Please provide a user ID.',
				},
			},
		},
	},
	{
		sequelize: db,
		tableName: 'user',
		modelName: 'user',
		timestamps: true,
	}
);

// hooks: hashes the password before creating the user
User.beforeCreate(async (user: any) => {
	try {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	} catch (err) {
		console.log(err);
	}
});

// creates the table
// table synchronization
// User.sync({ force: true });
export default User;
