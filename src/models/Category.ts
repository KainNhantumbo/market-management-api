import { Model, DataTypes } from 'sequelize';
import User from './User';
import db from '../database/connection';

class Category extends Model {}
Category.init(
	{
		name: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
			defaultValue: 'Acessories',
		},
		createdBy: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: 'id',
			},
		},
	},
	{
		sequelize: db,
		tableName: 'category',
		modelName: 'category',
		timestamps: true,
	}
);
// table synchronization
// Category.sync({ alter: true });
export default Category;
