import { Model, DataTypes } from 'sequelize/types';
import db from '../database/connection';

class Company extends Model {}

Company.init(
	{
		name: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		group: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: true,
		},
		country: {
			type: DataTypes.STRING({ length: 150 }),
			allowNull: false,
		},
		adress: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING({ length: 50 }),
			allowNull: false,
		},
	},
	{
		sequelize: db,
		modelName: 'company',
		tableName: 'company',
		timestamps: true,
	}
);

Company.sync({ force: true });
export default Company;
