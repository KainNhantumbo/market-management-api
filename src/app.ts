import express, { Application } from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { config } from 'dotenv';
import db from './database/connection';
import { employeesRoutes } from './routes/employees';
import { productsRoutes } from './routes/products';
import { error404Route } from './routes/error404';
import { userRoutes } from './routes/users';
import { authRoutes } from './routes/auth';
import { salesReportRoutes } from './routes/saleReports';
import { companyRoutes } from './routes/company';
import { categoriesRoutes } from './routes/categories';

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
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/employees', employeesRoutes);
app.use('/api/v1/sale-reports', salesReportRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/company', companyRoutes);
app.use(error404Route);

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
