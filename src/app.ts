import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { config } from 'dotenv';
import { employeesRoutes } from './routes/employees';
import { productsRoutes } from './routes/products';
import { error404Route } from './routes/error404';
import { userRoutes } from './routes/users';
import { authRoutes } from './routes/auth';
import { salesReportRoutes } from './routes/saleReports';
import { companyRoutes } from './routes/company';
import { categoriesRoutes } from './routes/categories';
import authenticator from './middlewares/auth';
import bootstrapServer from './utils/server';

// loads environment variables
config();

const app: Application = express();
const PORT = process.env.PORT || 4000;
const cors_options = { origin: 'http://localhost:3000' }
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 1200,
	standardHeaders: true,
	legacyHeaders: false,
});

// server config
app.use(cors(cors_options));
app.use(limiter);
app.use(helmet());
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);

// protected routes
app.use(authenticator);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/employees', employeesRoutes);
app.use('/api/v1/sale-reports', salesReportRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/company', companyRoutes);
app.use(error404Route);

// starts the server instance
bootstrapServer(PORT);
