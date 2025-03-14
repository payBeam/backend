import express from 'express';
import { handleCreateInvoice, handleGetInvoice, handleGetAllMerchantInvoice } from "@/controllers/invoiceController"
const router = express.Router();


router.post('/create', handleCreateInvoice);
router.get('/:id', handleGetInvoice);
router.get('/', handleGetAllMerchantInvoice)

export default router;


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

 