import { Application } from 'express';
import { Sequelize } from 'sequelize/types';

type Port = string | number;

/**
 * @param app express.Application
 * @param PORT string | number
 * @param db Sequelize database connection
 * @returns Promise<void>
 * @instance starts the server
 */
const bootstrapServer = async (app: Application, PORT: Port, db: Sequelize) => {
	try {
		await db.authenticate();
		console.log('Connection to database has been established successfully.');
		app.listen(PORT, () => {
			console.log(`Server listeling on port ${PORT}`);
		});
	} catch (err) {
		console.log('Unable to connect to the database: ', err);
	}
};

export default bootstrapServer;
