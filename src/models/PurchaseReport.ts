import { Model, DataTypes, UUIDV4 } from 'sequelize/types';
import db from '../database/connection';

class PurchaseReport extends Model {}
PurchaseReport.init(
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
			type: DataTypes.INTEGER({ length: 20 }),
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
		purchased_from: {
			type: DataTypes.STRING({ length: 250 }),
		},
		reference_id: {
			type: DataTypes.UUIDV4,
			defaultValue: UUIDV4,
		},
	},
	{
		sequelize: db,
		tableName: 'purchase_reports',
		modelName: 'purchase_reports',
		timestamps: true,
	}
);

PurchaseReport.sync({ force: true });
export default PurchaseReport;
