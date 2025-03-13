import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import { ensureAuthenticated } from "@/middleware"

const router = express.Router();


router.use("/auth", authRoutes);
router.use("/user", ensureAuthenticated, userRoutes);


export default router