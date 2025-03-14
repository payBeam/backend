import AppError from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    throw new AppError("unauthorized", 401);
};

