import GoogleStrategy from "passport-google-oauth20"
import { config } from "@/constants";
import passport from "passport";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


// Configure Google OAuth
passport.use(new GoogleStrategy.Strategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_REDIRECT_URL
},
    async (accessToken, refreshToken, profile, done) => {
        try {

            // check if a user exists with that provider or if that provider with id exists
            let user = await prisma.authProvider.findFirst({
                where: {
                    provider: 'google',
                    providerId: profile.id
                },
                include: { user: true }
            });
            // if not, create user provider
            if (!user) {
                let newUser = await prisma.user.create({
                    data: {
                        email: profile?.emails?.[0]?.value ?? "", // Ensure email exists, default to empty string

                        authProviders: {
                            create: {
                                provider: profile.provider,  // Google OAuth doesn't return `profile.provider`
                                providerId: profile.id,
                            }
                        }
                    }
                });
                return done(null, newUser);
            }
            // if so, return user
            console.log("profile", user);
        } catch (error) {
            return done(error, false);
        }

    }
));


// Serialize user
passport.serializeUser((user, done) => {
    // done(null, user.id);
    // TODO
    done(null, user);

});

passport.deserializeUser((user: any, done) => {
    // TODO Retrieve user from DB here (example)
    // const user = { id }; // Replace with actual DB fetch
    // done(null, user);
    return done(null, user);
});
