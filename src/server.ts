import './module-alias';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRoutes from '@/routes/userRoutes';
import globalErrorHandler from '@/utils/globalErrorHandler';
import AppError from '@/utils/AppError';

dotenv.config();

const app = express();
const prisma = new PrismaClient();



// Unhandled Rejections (e.g., database connection failures)
process.on('unhandledRejection', (err: Error) => {
    console.error('UNHANDLED REJECTION 💥', err.name, err.message);
    process.exit(1);
});

// Uncaught Exceptions (e.g., syntax errors)
process.on('uncaughtException', (err: Error) => {
    console.error('UNCAUGHT EXCEPTION 💥', err.name, err.message);
    process.exit(1);
});



app.use(cors());
app.use(express.json());


app.use('/api', userRoutes);
app.use(globalErrorHandler)

// 404 Handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});