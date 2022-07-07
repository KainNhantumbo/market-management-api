import express, { Application, Response, Request } from 'express';
import { config } from 'dotenv';
import db from './database/connection';

// loads environment variables
config();

const app: Application = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
	res.json({ name: 'tar' });
});

// starts the server instance
const startServer = async () => {
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

startServer();
