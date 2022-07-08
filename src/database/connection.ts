import { Sequelize, QueryInterface } from 'sequelize';
import { config } from 'dotenv';

// loads environment variables
config();
// instance of database connection configuration
const db = new Sequelize({
	dialect: 'postgres',
	host: process.env.DB_HOST,
	username: process.env.DB_USER_NAME,
	password: process.env.DB_PASSWORD,
	database: 'Market Management',
});

export default db;
