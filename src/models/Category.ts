import { Model, DataTypes } from 'sequelize';
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
			type: DataTypes.UUID,
			allowNull: false,
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
// Category.sync({ force: true });
export default Category;
