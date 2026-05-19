import express from 'express';
import cors from 'cors';

import indexRoutes from './routes/index.routes.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas principales
app.use(indexRoutes);

// Middleware 404
app.use(notFoundMiddleware);

export default app;