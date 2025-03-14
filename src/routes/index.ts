import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import invoiceRoutes from "./invoiceRoutes"
import merchantRoutes from "./merchantRoutes"
import payeeRoutes from "./payeeRoutes"
import { ensureAuthenticated } from "@/middleware"

const router = express.Router();


router.use("/auth", authRoutes);
router.use("/user", ensureAuthenticated, userRoutes);
// TODO: set a middleware so
// TODO : only merchant can call these endpoints 
router.use('/invoice', ensureAuthenticated, invoiceRoutes);
router.use("/merchant", ensureAuthenticated, merchantRoutes)
router.use("/payee", payeeRoutes)
export default router