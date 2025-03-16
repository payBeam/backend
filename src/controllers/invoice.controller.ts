import { asyncHandler } from "@/middlewares/asyncHandler"
import { createInvoice, getAllMerchantInvoices, getInvoiceById } from "@/services/invoice.service"
import { ApiResponse } from "@/utils/ApiResponse"
import { AppError } from "@/utils/AppError"
import { User } from "@prisma/client"
import { NextFunction, Response, Request } from "express"



export const handleCreateInvoice = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, tokenType, amount, paymentMode } = req.body;
    if (!title || !description || !tokenType || !amount || !paymentMode) {
        throw new AppError("missing parameters", 400)
    }
    const merchant = req.user as User
    const invoice = await createInvoice(amount, tokenType, title, description, paymentMode, merchant.id);
    if (!invoice) throw new AppError("Error Creating Invoice", 404);

    res.status(201).json(new ApiResponse("success", invoice))
})

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