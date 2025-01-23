import express from 'express';
import passport from 'passport';
import {google} from 'googleapis'

// console.log('CLIENT_URL:', process.env.CLIENT_URL);

 


const router = express.Router();

router.get("/login/success", (req,res)=>{
    if(req.user){

        // console.log("access token is")
        // console.log("access token is")
        // console.log(req.user.accessToken)
        // console.log(req.user)
        console.log("/login/success route hit")
            res.status(200).json({success:true,message:"Succcessfully logged in",
            user:req.user})
    }
    else{
        res.status(403).json({success:false,message:"Unauthorized reuquest"});
    }
})

router.get('/login/failed',(req,res)=>{
    return res.status(401).json({
        success:false,
        message:"log in failure",
    })
})

router.get(
    "/google/callback",
    (req, res, next) => {
        console.log("Google callback route hit");
        console.log("Request URL:", req.originalUrl);
        console.log("Query Params:", req.query);
        next();
    },
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed"
    })
);

router.get("/google" , passport.authenticate("google",
    console.log("/google route hit")
    ["profile","email","https://www.googleapis.com/auth/calendar.readonly"]
))

router.get("/logout" , (req,res)=>{
    req.logOut();
    res.redirect(process.env.CLIENT_URL);
})

router.get('/calendar/events',async(req,res)=>{

    // console.log(req.user.accessToken)

 
    if(!req.user || !req.user.accessToken) {
        return res.status(403).json({ success: false, message: "Unauthorized request. No access token found." });
    }


    try {

         const auth = new google.auth.OAuth2();
         auth.setCredentials({access_token:req.user.accessToken})  // provide the access token here to google auth for fetching calendar api
                   
        const calendar = google.calendar({version:'v3',auth:auth});
         const response = await calendar.events.list({
            calendarId:'primary',
            timeMin:(new Date()).toISOString(),
            maxResults:10,
            singleEvents:true,
            orderBy:'startTime',
         })

         const events = response.data.items;
        //  console.log(events);   
         if(events.length === 0){
            return res.json({success:true, message:"No upcoming events planned"})
         }

         res.status(200).json({success:true,message:"events fetched" , events})

    } catch (error) {
        console.error('Error fetching events:', error.message); 
        res.status(400).json({success:false,message:"Failed to fetch events"})
    }
})

export const route = router