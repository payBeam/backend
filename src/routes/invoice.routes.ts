import express from 'express';
import { handleCreateInvoice, handleGetTotalBalance, handleGetInvoice, handleGetAllMerchantInvoices, handleSetPaymentMode } from "@/controllers/invoice.controller"
const router = express.Router();

//create invoice endpoint does the following thing
/* 
    - recieves amount in USDC
    - receives desc and title (optional)
    - default status is pending
    - payment mode also of type enum
*/

/* 
    - the invoice can be updated to whichever payment address the end user clicks to pay to
    - the payment address will be abother modal, it will be an array.
    - will receive the amount, the address, status, payment type
*/
// ! invoice update will be updated from events receieved from the blockchain
// ! hence no route will be created to update it

router.post('/create', handleCreateInvoice);
router.get("/balance", handleGetTotalBalance)
router.get('/:id', handleGetInvoice);
router.get('/', handleGetAllMerchantInvoices)
router.put('/set-payment-mode', handleSetPaymentMode)

export default router;



