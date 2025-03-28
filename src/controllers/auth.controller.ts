import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { config } from '@/constants';
import { createUser, getUserByProviderId } from '@/services/user.service';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const handleGoogleAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { payload } = req.body;


    // console.log("payload",payload)
    let user;
    user = await getUserByProviderId(payload?.sub!);
    // console.log("user",user)
    // if not, create user
    if (!user) {
        user = await createUser(payload?.email!, "google", payload?.sub!);
    }

    // Generate JWT Tokens
    const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
    );

    // Set refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


    // Send access token and user data
    return res.status(200).json(new ApiResponse("success", { user, accessToken }));

})


export const handleGetAuthLink = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("🔄 Redirecting to Google OAuth...");
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

export const handleRedirect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { failureRedirect: "/" }, (err, user, info) => {
        if (err) return next(err);
        if (!user) throw new AppError("Authentication failed", 401);

        // Generate JWT Tokens
        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: "7d" }
        );

        // Set refresh token as an HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Send access token and user data
        return res.status(200).json(new ApiResponse("success", { user, accessToken }));
    })(req, res, next);
});


export const handleRefreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;  // Get token from secure cookie
    if (!refreshToken) throw new AppError("no token -> Forbidden", 403); // No token → Forbidden

    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET!) as { userId: string };;
    const newAccessToken = jwt.sign({ userId: decoded.userId }, config.JWT_SECRET!, { expiresIn: "15m" });

    res.status(200).json(new ApiResponse("success", { accessToken: newAccessToken }));

})

export const handleLogout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken");
    res.status(200).json(new ApiResponse("success", "Logged out"));
})