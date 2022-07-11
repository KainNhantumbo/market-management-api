import { Model, DataTypes, UUIDV4 } from 'sequelize';
import db from '../database/connection';

class Product extends Model {}
Product.init(
	{
		name: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT({ length: 20 }),
			allowNull: false,
		},
		base_price: {
			type: DataTypes.FLOAT({ length: 20 }),
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING({ length: 2500 }),
			allowNull: true,
		},
		provider: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: true,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		lot: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		reference_id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			allowNull: false,
		},
	},
	{
		sequelize: db,
		timestamps: true,
		tableName: 'products',
		modelName: 'products',
	}
);
// creates the table
Product.sync({ force: true });
export default Product;
