import express from 'express';
import { handleRedirect, handleGetAuthLink } from "@/controllers/authController"
const router = express.Router();

// *-------- PAYEE ROUTES  --------------
/*
    TODO - create (USDC) address to pay to tied to the invoice
    TODO - create (USDT) address to pay to tied to the invoice
    TODO - create (BNB) address to pay to tied to the invoice
    TODO - create (ZETA) address to pay to tied to the invoice
    TODO - create (ETH) address to pay to tied to the invoice

*/

// * tokens on Stellar
router.post('/create/:invoiceid/usdc', handleGetAuthLink)
router.post('/create/:invoiceid/usdt', handleGetAuthLink)

// * tokens on zeta
router.post('/create/:invoiceid/bnb', handleGetAuthLink)
router.post('/create/:invoiceid/zeta', handleGetAuthLink)
router.post('/create/:invoiceid/eth', handleGetAuthLink)



export default router;
