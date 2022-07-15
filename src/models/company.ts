import { Model, DataTypes } from 'sequelize';
import User from './User';
import db from '../database/connection';

class Company extends Model {}

Company.init(
	{
		name: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter company name.',
				},
			},
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter company description.',
				},
			},
		},
		group: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: true,
		},
		country: {
			type: DataTypes.STRING({ length: 150 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter company country.',
				},
			},
		},
		adress: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter company adress.',
				},
			},
		},
		phone: {
			type: DataTypes.STRING({ length: 50 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter your phone number.',
				},
			},
		},
		email: {
			type: DataTypes.STRING({ length: 50 }),
			allowNull: false,
			validate: {
				isEmail: {
					msg: 'Please provide valid e-mail.',
				},
			},
		},
		createdBy: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
	},
	{
		sequelize: db,
		modelName: 'company',
		tableName: 'company',
		createdAt: true,
	}
);
// table synchronization
// Company.sync({ force: true });
export default Company;
