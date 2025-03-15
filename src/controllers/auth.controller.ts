import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';



export const handleGetAuthLink = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("🔄 Redirecting to Google OAuth...");
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

export const handleRedirect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { failureRedirect: "/" }, (err, user, info) => {
        if (err) return next(err); // Handle errors
        if (!user) throw new AppError("an error occured, authntication failed", 401);

        // Log the user in
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json(new ApiResponse("success", user));
        });
    })(req, res, next);
});
