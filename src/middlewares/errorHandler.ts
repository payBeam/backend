import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@/utils/ApiResponse";
import { AppError } from "@/utils/AppError";

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json(new ApiResponse("fail", message));
};
