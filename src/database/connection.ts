import { Sequelize } from 'sequelize';

// instance of database connection configuration
const db = new Sequelize({
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'solaris',
});

export default db
