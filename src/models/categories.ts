import { Model, DataTypes } from 'sequelize';
import db from '../database/connection';

class Categories extends Model {}
Categories.init(
	{
		name: {
			type: DataTypes.STRING({ length: 256 }),
			allowNull: false,
		},
	},
	{
		sequelize: db,
		tableName: 'categories',
		modelName: 'categories',
		timestamps: true,
	}
);

Categories.sync({ force: true });
export default Categories;
