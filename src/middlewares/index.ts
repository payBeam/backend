import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler";
import jwt from "jsonwebtoken";
import { config } from "@/constants";
import { getUserById } from "@/services/user.service";
import { User } from "@prisma/client";
import { getMerchantById } from "@/services/merchant.service";


export const ensureAuthenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.cookies)
    const token = req.cookies.token;
    if (!token) {
        throw new AppError("Not authenticated", 401);
    }

    const decoded = jwt.verify(token, config.JWT_SECRET!) as { userId: string };
    const user = await getUserById(decoded.userId)
    if (user) {
        req.user = user;
        next();
    } else {
        throw new AppError("User does not exist", 401);

    }
})

export const ensureMerchant = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    const isMerchant = await getMerchantById(user?.id);
    if (isMerchant) {
        next()

    } else {
        throw new AppError("Protected Route", 403);

    }
})