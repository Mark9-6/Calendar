import express from 'express'
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import cors from 'cors'
import cookieSession from 'cookie-session'
import passport from 'passport'
import './passport.js';
import {route as authRoute} from './routes/auth.js'
 

    
// console.log(process.env.CLIENT_URL);
// console.log(process.env.CLIENT_URL);
// console.log(process.env.CLIENT_URL);
// console.log(process.env.CLIENT_URL);
// console.log(process.env.CLIENT_URL);
// console.log('CLIENT_URL:', process.env.CLIENT_URL);
const app = express();
//////////////////////
app.use(express.json())
////////////////

app.use(
    cookieSession({
        name:"session",
        keys:["mark"],
        maxAge:24*60*60*100  // one day expiry 
    })
)

app.use(passport.initialize());
app.use(passport.session());

console.log('CLIENT_URL:', process.env.CLIENT_URL); 

app.use(cors({
     origin: "*",
     methods:"GET,PUT,POST,DELETE",
     credentials:true,
}))

app.use('/auth',authRoute)      // auth routes endpint-> port/auth

const PORT = process.env.PORT || 8080;
 

app.listen(PORT , ()=>{
    console.log(`App listening on port :${PORT}`)
})