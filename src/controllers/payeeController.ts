import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient()

export const handleGetMemo = async (req: Request, res: Response, next: NextFunction) => {
    try {
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

    } catch (error: any) {
        res.status(401).json({
            status: "failed",
            data: error.message
        })
    }
}


// export const handleGetMemo = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//     } catch (error: any) {
//         res.status(401).json({
//             status: "failed",
//             data: error.message
//         })
//     }
// }