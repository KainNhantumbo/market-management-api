import db from '../database/connection';
import { Model, DataTypes, UUIDV4 } from 'sequelize';

class Employee extends Model {}
Employee.init(
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
			unique: true,
			validate: {
				isEmail: { msg: 'Please enter a valid e-mail adress.' },
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
		date_of_entry: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please provide the date of entry.',
				},
			},
		},
		reference_id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: UUIDV4,
		},
	},
	{
		sequelize: db,
		tableName: 'Employee',
		modelName: 'Employee',
		timestamps: true,
	}
);

// creates the table
// Employee.sync({ alter: true });
export default Employee;
