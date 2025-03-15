import { NextFunction, Request, Response } from 'express';
import passport from 'passport';


export const handleGetAuthLink = async (req: Request, res: Response, next: NextFunction) => {
    console.log("🔄 Redirecting to Google OAuth...");
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
};

export const handleRedirect = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { failureRedirect: "/" }, (err, user, info) => {
        if (err) return next(err); // Handle errors
        if (!user)
            return res.status(401).json({ mesage: "an error occured, authntication failed" }); // If authentication fails, redirect to home

        // Log the user in
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({
                data: user
            })
        });
    })(req, res, next);
};
