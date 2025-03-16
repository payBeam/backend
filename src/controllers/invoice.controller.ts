import { asyncHandler } from "@/middlewares/asyncHandler"
import { ApiResponse } from "@/utils/ApiResponse"
import { User } from "@prisma/client"
import { NextFunction, Response, Request } from "express"



export const handleCreateInvoice = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user as User
    const dd = "sssss"
    res.status(201).json(new ApiResponse("success", dd))
})

export const handleGetInvoice = () => {

}
export const handleGetAllMerchantInvoice = () => {

}

export const handleSetPaymentMode = () => {

}