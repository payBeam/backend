import express from 'express';
import { handleGetAuthLink } from "@/controllers/auth.controller"
import { handleGenerateMemo } from "@/controllers/invoiceSettlement.controller"
const router = express.Router();

// *-------- PAYEE ROUTES  --------------
/*
TODO - 
TODO - create (USDC) address to pay to tied to the invoice
TODO - create (USDT) address to pay to tied to the invoice
TODO - create (BNB) address to pay to tied to the invoice
TODO - create (ZETA) address to pay to tied to the invoice
TODO - create (ETH) address to pay to tied to the invoice

* - proper error managemnt, 
TODO - event listners
TODO - documentation
TODO - tests
*/

// * tokens on Stellar
router.post('/create/:invoiceid/usdc', handleGenerateMemo)
// router.post('/create/:invoiceid/usdt', handleGetMemo)

// * tokens on zeta
// router.post('/create/:invoiceid/bnb', handleGetAuthLink)
// router.post('/create/:invoiceid/zeta', handleGetAuthLink)
// router.post('/create/:invoiceid/eth', handleGetAuthLink)



export default router;
