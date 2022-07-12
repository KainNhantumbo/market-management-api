import db from '../database/connection';
import { Model, DataTypes, UUIDV4 } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {}
User.init(
	{
		first_name: {
			type: DataTypes.STRING({ length: 50 }),
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING({ length: 50 }),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING({ length: 50 }),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		user_name: {
			type: DataTypes.STRING({ length: 50 }),
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.TEXT,
		},
		phone: {
			type: DataTypes.STRING({ length: 30 }),
			allowNull: false,
		},
		adress: {
			type: DataTypes.STRING({ length: 150 }),
			allowNull: true,
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		gender: {
			type: DataTypes.CHAR({ length: 10 }),
			allowNull: false,
		},
		department: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
		},
		qualification: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
		},
		date_of_entry: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		reference_id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: UUIDV4,
		},
	},
	{
		sequelize: db,
		tableName: 'User',
		modelName: 'User',
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
User.sync({ force: true });
export default User;
