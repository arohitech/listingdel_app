const express = require("express");
const router = express.Router();
const user = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");


router
 .route("/signup")
   .get( (req,res)=> {
     res.render("user/form.ejs");
     })
     .post(wrapAsync(async(req,res) => {
        try{
           let{username , emailId , password} = req.body;
           const newuser = new user({username , emailId , password});
           const registereduser = await user.register(newuser , password);
           req.login(registereduser, (err) => {
           if(err){
               return next(err);
            }
              req.flash("success" , "user registered successfully !");
              res.redirect("/bylistings");
            });
              }catch(err){
               req.flash("error" , err.message);
               res.redirect("/signup");
            }

   
         }));


router
 .route("/login")
   .get( (req,res) => {
    res.render("user/login.ejs");
    })
    .post(saveRedirectUrl, passport.authenticate("local",{
      failureRedirect : "/login",
      failureFlash : true
    }),

    async(req,res)=> {
      req.flash("success" , "welcome back to wanderlust ");
      const redirecturl = res.locals.redirecturl || "/bylistings";
      res.redirect(redirecturl);
    }
   );

router.get("/logout" , (req,res) => {

    req.flash("success" , "successfully logged out");
    res.redirect("/bylistings");

});


module.exports = router;