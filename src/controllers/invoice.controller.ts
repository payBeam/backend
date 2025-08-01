import { asyncHandler } from "@/middlewares/asyncHandler"
import { createInvoice, getAllMerchantInvoices, getFilteredInvoiceSum, getInvoiceById } from "@/services/invoice.service"
import { ApiResponse } from "@/utils/ApiResponse"
import { AppError } from "@/utils/AppError"
import { Merchant, User } from "@prisma/client"
import { NextFunction, Response, Request } from "express"
import { prepCreateInvoice } from "@/functions/xlm/prepare-transaction";
import { decodeTime } from "ulid";
import { createZetaInvoice } from "@/functions/relayer/zeta"

export const handleCreateInvoiceOnXLM = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, tokenType, amount, publicKey } = req.body;
    console.log(req.body)
    if (!tokenType || !amount || !publicKey) {
        throw new AppError("missing parameters", 400)
    }
    const merchant = req.user as User
    const invoice = await createInvoice(amount, description, merchant.id);
    const timestampMs = decodeTime(invoice.id);
    const timeInSec = Math.floor(timestampMs / 1000);
    // console.log("timestamp", timeInSec)

    const oneDayInSeconds = 86400;
    const updatedTimestampSec = timeInSec + oneDayInSeconds;

    const date2026 = new Date("2026-01-01T00:00:00Z");
    const unixTimestamp2026 = Math.floor(date2026.getTime() / 1000);

    console.log("updatedTimestampSec", unixTimestamp2026)


    // create the invoice on XLM network
    // TODO : set actual due date, by incrasing createdAt by a day
    const xdr = await prepCreateInvoice(publicKey, invoice.id, amount, unixTimestamp2026).catch((err) => {
        console.log("Error creating invoice on XLM network", err.message)
    });

    // TODO  if soroban fails to create the invoice, delete the invoice from the database
    if (!invoice || !xdr) throw new AppError("Error Creating Invoice", 404);

    res.status(201).json(new ApiResponse("success", { xdr, invoice }))
})


export const handleCreateInvoiceOnEVM = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { description, amount } = req.body;
    if (!amount || !description) {
        throw new AppError("missing parameters", 400)
    }
    const user = req.user as User
    // ! - TypeScript should not allow directly assigning to req.merchant in (types/exppress/index.d.ts)
    const merchant = (req as Request & { merchant?: Merchant }).merchant!
    // TODO : add support for any EVM based invoices not just BASE
    const invoice = await createInvoice(amount, description, user.id);
    const EVMInvoice = await createZetaInvoice(invoice, merchant);

    // TODO  if relayer fails to create the invoiceonchain, delete the invoice from the database
    if (!invoice || !EVMInvoice) throw new AppError("Error Creating Invoice", 404);

    res.status(201).json(new ApiResponse("success", { EVMInvoice, invoice }))

});


export const handleCreateInvoiceOnZETA = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { description, amount } = req.body;
    if (!amount) {
        throw new AppError("missing parameters", 400)
    }
    const user = req.user as User

    // ! - TypeScript should not allow directly assigning to req.merchant in (types/exppress/index.d.ts)
    const merchant = (req as Request & { merchant?: Merchant }).merchant!

    // ! "ZETA" should not be hardcoded, 
    // the preferred settlement token should be gotten from the merhcant profile once the feature is ready
    const invoice = await createInvoice(amount, description, user.id);
    const zetaInvoice = await createZetaInvoice(invoice, merchant);

    // TODO  if relayer fails to create the invoiceonchain, delete the invoice from the database
    if (!invoice || !zetaInvoice) throw new AppError("Error Creating Invoice", 404);

    res.status(201).json(new ApiResponse("success", { txHash: zetaInvoice.hash, invoice }))
});


export const handleGetInvoice = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const invoice = await getInvoiceById(id)
    if (!invoice) throw new AppError("No Invoice Found", 404);
    console.log(invoice);
    res.status(200).json(new ApiResponse("success", invoice))

})



export const handleGetAllMerchantInvoices = asyncHandler(async (req: Request, res: Response) => {

    if (req.user) {
        const user = req.user as User;
        const merchant = await getAllMerchantInvoices(user.id)
        if (!merchant) {
            throw new AppError("No invoice found", 404);

        }
        res.status(200).json(new ApiResponse("success", merchant));
    }

});

export const handleSetPaymentMode = () => {

}

export const handleGetTotalBalance = asyncHandler(async (req: Request, res: Response) => {
    console.log("got here2")
    if (req.user) {
        console.log("got here3")
        const user = req.user as User;
        const merchant = await getFilteredInvoiceSum(user.id)
        if (!merchant) {
            throw new AppError("Could not get balance", 404);

        }
        res.status(200).json(new ApiResponse("success", merchant));
    }
})

