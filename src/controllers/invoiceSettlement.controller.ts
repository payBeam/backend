import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from "@/middlewares/asyncHandler";
import { ApiResponse } from '@/utils/ApiResponse';
import { getInvoiceById } from '@/services/invoice.service';
import { AppError } from '@/utils/AppError';
import { config } from '@/constants';
import { createInvoicePayment } from '@/services/invoiceSettlement.service';
import { approveContract, prepPayInvoice } from '@/functions/xlm/prepare-transaction';

const prisma = new PrismaClient()

export const handleGenerateMemo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { invoiceid } = req.params
    // console.log(invoiceid)
    // ? find of the invoice exists
    const invoiceExist = await getInvoiceById(invoiceid);
    if (!invoiceExist) throw new AppError("Invoice does not exist", 404);
    // ? create paymentSettlment from the invoice id

    const { tokenType } = req.body;
    if (!tokenType) throw new AppError("missing paramaters", 400);
    const paymentSet = await createInvoicePayment(config.PAYBEAM_CONTRACT!, tokenType, invoiceid);

    if (!paymentSet) throw new AppError("Error creating invoice payment", 400);

    res.status(201).json(new ApiResponse("success", paymentSet))

})

export const handlePayInvoice = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { invoiceId, publicKey, amount } = req.body
    if (!invoiceId || !publicKey || !amount) throw new AppError("missing paramaters", 400);

    // ? find of the invoice exists
    const invoiceExist = await getInvoiceById(invoiceId);
    if (!invoiceExist) throw new AppError("Invoice does not exist", 404);

    // ? create paymentSettlment from the invoice id
    const xdr = await prepPayInvoice(publicKey, invoiceId, amount)

    if (!xdr) throw new AppError("Error creating invoice payment", 400);

    res.status(200).json(new ApiResponse("success", xdr))

})

export const handleCreateUSDCTrustline = asyncHandler(async (req:Request, res: Response, next: NextFunction) => {
    const {publicKey, amount} = req.body;
    if (!publicKey || !amount) {
        throw new AppError("missing parameter", 400)
    }

    const xdr = await approveContract(publicKey, amount);

    if (!xdr) throw new AppError("Error building trustline transaction", 400);

    res.status(200).json(new ApiResponse("success", xdr))



})

// export const handleGetMemo = async (
// req: Request, res: Response, next: NextFunction) => {
//     try {

//     } catch (error: any) {
//         res.status(401).json({
//             status: "failed",
//             data: error.message
//         })
//     }
// }