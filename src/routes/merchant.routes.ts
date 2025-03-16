import express from 'express';
import {  handleCreateMerchant } from "@/controllers/merchant.controller"
const router = express.Router();

// *-------- MERCHANT ROUTES  --------------
router.post('/create', handleCreateMerchant)
router.put('/update')
// router.get("/:id", handleRedirect)
router.get("/")



export default router;
