import express from 'express';
import { handleRedirect, handleGetAuthLink } from "@/controllers/auth.controller"
const router = express.Router();

// *-------- MERCHANT ROUTES  --------------
router.post('/create', handleGetAuthLink)
router.put('/update')
router.get("/:id", handleRedirect)
router.get("/")



export default router;
