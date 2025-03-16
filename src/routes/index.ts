import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import invoiceRoutes from "./invoice.routes"
import merchantRoutes from "./merchant.routes"
import invoiceSettlement from "./invoiceSettlement.routes"
import { ensureAuthenticated, ensureMerchant } from "@/middlewares"

const router = express.Router();


router.use("/auth", authRoutes);
router.use("/user", ensureAuthenticated, userRoutes);
router.use('/invoice', ensureAuthenticated, ensureMerchant, invoiceRoutes);
router.use("/merchant", ensureAuthenticated, merchantRoutes)
router.use("/invoice-settlement", invoiceSettlement)
export default router