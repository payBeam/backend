import express from 'express';
import { handleRedirect, handleGetAuthLink } from "@/controllers/authController"
const router = express.Router();

// *-------- PAYEE ROUTES  --------------
router.post('/create', handleGetAuthLink)
router.put('/update')
router.get("/:id", handleRedirect)
router.get("/")



export default router;
