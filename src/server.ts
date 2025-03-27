import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import routes from '@/routes/index';
import { errorHandler } from "@/middlewares/errorHandler";
import { setupSwagger } from "@/docs/swagger"
import morgan from "morgan"
import passport from 'passport';
import session from 'express-session';
import { config } from "@/constants/index"
import "@/functions/google"
import { AppError } from "@/utils/AppError";
import cookieParser from "cookie-parser";
import { listenForPayments } from '@/functions/event-listeners';
import { testPayment } from './functions/send-xlm';
// import "@/functions/address-generator/stellar"


const app = express();
const prisma = new PrismaClient();

// Start the payment listener
// listenForPayments();





// Handle graceful shutdown
process.on("SIGINT", () => {
    console.log("🛑 Shutting down Stellar payment listener...");
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("🛑 Shutting down Stellar payment listener...");
    process.exit(0);
});

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



const allowedOrigins = [
    'http://localhost:3000',
    'https://paybeam.vercel.app/'
];


const corsOptions = {
    origin: allowedOrigins, 
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 


// Initialize Passport
app.use(passport.initialize());
// app.use(passport.session());


app.use('/api', routes);
setupSwagger(app);

// 404 Handler
app.all('*', (req, res, next) => {
    next( new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler)
// testPayment("01JPGF96W1R00FD3RZRX51VYC0");


app.listen(config.PORT, () => {
    // Your application code here
    console.log('Application started with config Loaded up✅');
    console.log(`Server running on port ${config.PORT}`);
});