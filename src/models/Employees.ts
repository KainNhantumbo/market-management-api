import db from '../database/connection';
import { Model, DataTypes, UUIDV4 } from 'sequelize';

class Employee extends Model {}

Employee.init(
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
		phone: {
			type: DataTypes.STRING({ length: 30 }),
			allowNull: false,
		},
		adress: {
			type: DataTypes.STRING({ length: 150 }),
			allowNull: true,
		},
		age: {
			type: DataTypes.INTEGER({ length: 3 }),
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
		tableName: 'Employee',
		modelName: 'Employee',
		timestamps: true,
	}
);

// creates the table
// Employee.sync({ force: true });

export { Employee };
