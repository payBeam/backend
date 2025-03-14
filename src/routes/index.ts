import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import invoiceRoutes from "./invoiceRoutes"
import { ensureAuthenticated } from "@/middleware"

const router = express.Router();


router.use("/auth", authRoutes);
router.use("/user", ensureAuthenticated, userRoutes);
router.use('/invoice', ensureAuthenticated, invoiceRoutes);

export default router