import GoogleStrategy from "passport-google-oauth20"
import { config} from "@/constants";
import passport from "passport";


// Configure Google OAuth
passport.use(new GoogleStrategy.Strategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_REDIRECT_URL
},
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
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
