import express from 'express';
import { handleRedirect, handleGetAuthLink, handleRefreshToken, handleLogout, handleGoogleAuth } from "@/controllers/auth.controller"
const router = express.Router();

// *-------- GOOGLE AUTH --------------


router.post("/google", handleGoogleAuth);



// ! DEPRECATED - because we are switching to using @react-oauth/google on the frontend, which handles the redirect and refresh token logic for us
router.get('/google-auth-link', handleGetAuthLink)

router.get("/google-redirect", handleRedirect)

router.post("/refresh-token", handleRefreshToken )

router.post("/logout", handleLogout)
// ! DEPRECATED - because we are switching to using @react-oauth/google on the frontend, which handles the redirect and refresh token logic for us

export default router;
