// This is basically a configuration file and need not to be export and for import just import from './passport.js'
 
import dotenv from 'dotenv';
dotenv.config();

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";




passport.use(new GoogleStrategy(
    {
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"https://calendar-server-xi.vercel.app/auth/google/callback",
        scope:["profile","email","https://www.googleapis.com/auth/calendar.readonly"],
    },
    function (accessToken,refreshToken,profile,callback){
        // console.log(refreshToken)
        profile.accessToken=accessToken;
        callback(null,profile);
    }
));

passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((user,done)=>{
    done(null,user);
})
