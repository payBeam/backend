import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { asyncHandler } from "@/middlewares/asyncHandler";
import { ApiResponse } from '@/utils/ApiResponse';
import { createMerchant, getMerchantById } from '@/services/merchant.service';
import { AppError } from '@/utils/AppError';

const prisma = new PrismaClient();

export const handleCreateMerchant = asyncHandler(async (req: Request, res: Response) => {
    const { name, description } = req.body;
    if (!name || !description) {
        throw new AppError("parameters not found to create a merchant", 401);
    }
    if (req.user) {
        const user = req.user as User;
        const merchant = await createMerchant(name, description, user.id);
        // if (!merchant) {
        //     throw new AppError("Merchant not found", 404);
        // }
        res.status(201).json(new ApiResponse("success", merchant));
    }


});

export const handleGetAMarchant = asyncHandler(async (req: Request, res: Response) => {

    if (req.user) {
        const user = req.user as User;
        const merchant = await getMerchantById(user.id)
        if (!merchant) {
            throw new AppError("Merchant not found", 404);

        }
        res.status(200).json(new ApiResponse("success", merchant));
    }

});

