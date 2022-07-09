import express, { Application } from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { config } from 'dotenv';
import db from './database/connection';
import { employeesRoutes } from './routes/employees';
import { productsRoutes } from './routes/products';

// loads environment variables
config();

const app: Application = express();
const PORT = process.env.PORT;
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use('/api/v1/employees', employeesRoutes);
app.use('/api/v1/products', productsRoutes);

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
