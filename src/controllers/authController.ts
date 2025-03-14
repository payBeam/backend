import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';

const prisma = new PrismaClient();

export const handleGetAuthLink = async (req: Request, res: Response, next: NextFunction) => {
    console.log("🔄 Redirecting to Google OAuth...");
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
};

export const handleRedirect = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { failureRedirect: "/" }, (err, user, info) => {
        if (err) return next(err); // Handle errors
        if (!user) return res.redirect("/"); // If authentication fails, redirect to home

        // Log the user in
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect("/dashboard"); // Redirect after login
        });
    })(req, res, next);
};
