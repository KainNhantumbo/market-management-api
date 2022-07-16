import { Model, DataTypes } from 'sequelize';
import db from '../database/connection';

class SaleReport extends Model {}
SaleReport.init(
	{
		name: {
			type: DataTypes.STRING({ length: 250 }),
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING({ length: 150 }),
			allowNull: false,
		},
		quantity: {
			type: DataTypes.FLOAT({ length: 20 }),
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
		profit: {
			type: DataTypes.FLOAT({ length: 20 }),
			allowNull: false,
		},
		total_price: {
			type: DataTypes.FLOAT({ length: 20 }),
			allowNull: false,
		},
		customer_name: {
			type: DataTypes.STRING({ length: 250 }),
		},
		createdBy: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize: db,
		tableName: 'saleReports',
		modelName: 'saleReports',
		timestamps: true,
	}
);

// table synchronization
// SaleReport.sync({ force: true });
export default SaleReport;
