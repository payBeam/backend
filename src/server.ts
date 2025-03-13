import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import routes from '@/routes/index';
// import globalErrorHandler from '@/utils/globalErrorHandler';
import AppError from '@/utils/AppError';
import { setupSwagger } from "@/docs/swagger"
import morgan from "morgan"
import passport from 'passport';
// import '@/utils/passport';
import session from 'express-session';
import { config } from "@/constants/index"
// import config from "@/constants"


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
app.use(morgan('combined'))

// Session middleware
app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: config.NODE_ENV === 'production', // Only secure in production
            httpOnly: true, // Prevent XSS attacks
            sameSite: 'lax' // Protect against CSRF
        }
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', routes);
setupSwagger(app);

// 404 Handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});



app.listen(config.PORT, () => {
    // Your application code here
    console.log('Application started with config Loaded up✅');
    console.log(`Server running on port ${config.PORT}`);
});