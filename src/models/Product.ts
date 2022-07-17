import { Model, DataTypes } from 'sequelize';
import db from '../database/connection';

class Product extends Model {}
Product.init(
	{
		name: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter product name.',
				},
			},
		},
		price: {
			type: DataTypes.FLOAT({ length: 20 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter product price.',
				},
			},
		},
		type: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter product type.',
				},
			},
		},
		description: {
			type: DataTypes.STRING({ length: 2500 }),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please enter product description.',
				},
			},
		},
		provider: {
			type: DataTypes.STRING({ length: 250 }),
			defaultValue: 'Not specified.',
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Please provide product quantity.',
				},
			},
		},
		lot: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		createdBy: {
			type: DataTypes.UUID,
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
// Product.sync({ force: true });
export default Product;
