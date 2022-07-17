import express, { Application } from 'express';
import db from '../database/connection';
const app: Application = express();

type Port = string | number;

/**
 * @param PORT string | number
 * @returns Promise<void>
 * @instance starts the server
 */
const bootstrapServer = async (PORT: Port) => {
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
