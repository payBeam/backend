import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from "@/middlewares/asyncHandler";
import { ApiResponse } from '@/utils/ApiResponse';

const prisma = new PrismaClient()

export const handleGenerateMemo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { invoiceid } = req.params
        console.log(invoiceid)
        // TODO find of the invoice exists

        // const usdtPayeeData = await prisma.payee.create({
        //     data: {
        //         address: "jgjgj",
        //         token: 'USDC',
        //         invoiceId: invoiceid
        //     }
        // })

 
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