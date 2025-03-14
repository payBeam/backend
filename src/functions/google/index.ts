import GoogleStrategy from "passport-google-oauth20"
import { config } from "@/constants";
import passport from "passport";
import { PrismaClient, User } from '@prisma/client';


const prisma = new PrismaClient();

type SerializedUser = { id: string };


// Configure Google OAuth
passport.use(new GoogleStrategy.Strategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_REDIRECT_URL
},
    async (accessToken, refreshToken, profile, done) => {
        try {

            // check if a user exists with that provider or if that provider with id exists
            let user = await prisma.user.findFirst({
                where: {
                    authProviders: {
                        some: {  // Use `some` to check if any authProvider matches
                            provider: 'google',
                            providerId: profile.id
                        }
                    }
                },
                include: { authProviders: true }
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
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }

    }
));


// Serialize user
passport.serializeUser((user: any, done) => {
    done(null, { id: user.id } as SerializedUser);
});


passport.deserializeUser(async (serializedUser: SerializedUser, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: serializedUser.id } });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
