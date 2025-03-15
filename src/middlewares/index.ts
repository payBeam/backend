import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler";

export const ensureAuthenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Authenticated User:", req.user); // Debugging

    if (req.isAuthenticated()) {
        return next();
    }
    throw new AppError("unauthorized", 401);
});

