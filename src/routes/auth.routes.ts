import express from 'express';
import { handleRedirect, handleGetAuthLink, handleRefreshToken, handleLogout } from "@/controllers/auth.controller"
const router = express.Router();

// *-------- GOOGLE AUTH --------------
router.get('/google-auth-link', handleGetAuthLink)

router.get("/google-redirect", handleRedirect)

router.post("/refresh-token", handleRefreshToken )

router.post("/logout", handleLogout)

export default router;
