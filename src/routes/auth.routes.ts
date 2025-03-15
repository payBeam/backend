import express from 'express';
import { handleRedirect, handleGetAuthLink } from "@/controllers/auth.controller"
const router = express.Router();

// *-------- GOOGLE AUTH --------------
router.get('/google-auth-link', handleGetAuthLink)

router.get("/google-redirect", handleRedirect)

export default router;
