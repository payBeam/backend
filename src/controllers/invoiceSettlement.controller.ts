import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from "@/middlewares/asyncHandler";
import { ApiResponse } from '@/utils/ApiResponse';
import { getInvoiceById } from '@/services/invoice.service';
import { AppError } from '@/utils/AppError';
import { config } from '@/constants';
import { createInvoicePayment } from '@/services/invoiceSettlement.service';

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
    const paymentSet = await createInvoicePayment(config.STELLAR_PUB_KEY!, tokenType, invoiceid);

    if (!paymentSet) throw new AppError("Error creating invoice payment", 400);

    res.status(201).json(new ApiResponse("success", paymentSet))

})


// export const handleGetMemo = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//     } catch (error: any) {
//         res.status(401).json({
//             status: "failed",
//             data: error.message
//         })
//     }
// }