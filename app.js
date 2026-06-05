import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.routes.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', apiRoutes);

app.use(errorHandler);

export default app;