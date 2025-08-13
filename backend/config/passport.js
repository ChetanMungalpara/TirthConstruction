

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        // The 'profile' object contains the user's Google info.
        const newUser = {
            googleId: profile.id,
            email: profile.emails[0].value,
            // You can pre-fill other details if you want
            // name: profile.displayName 
        };

        try {
            // Find a user in your DB with this Google ID.
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                // If user exists, proceed.
                done(null, user);
            } else {
                // If not, check if a user with that email exists.
                // This handles cases where a contractor was added manually first.
                user = await User.findOne({ email: profile.emails[0].value });
                
                if (user) {
                    // If email exists, link the Google ID to their account.
                    user.googleId = profile.id;
                    await user.save();
                    done(null, user);
                } else {
                    // This case is for a brand new user signing up.
                    // IMPORTANT: You need to decide how to link them to a Contractor profile.
                    // For now, we will return an error, as contractors should be pre-registered.
                    // In the future, you could create a new contractor profile here.
                    return done(new Error("User not pre-registered. Please contact an administrator."), null);
                }
            }
        } catch (err) {
            console.error(err);
            done(err, null);
        }
    }));

    // These are not used for JWT sessions but are required by Passport.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};
