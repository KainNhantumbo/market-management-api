import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

// loads environment variables
config();
// creates an instance of database connection
const db = new Sequelize({
	dialect: 'postgres',
	host: process.env.DB_HOST,
	username: process.env.DB_USER_NAME,
	password: process.env.DB_PASSWORD,
	database: 'market_management',
	logging: false,
});

export default db;
