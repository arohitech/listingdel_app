const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const { Mongoose } = require("mongoose");
const upload = multer({storage});
const mbxgeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mongoose = require("mongoose");
require('dotenv').config();




const validatelisting = (req,res,next) =>{
  let result = listingSchema.validate(req.body);
  console.log(result);
  if(result.error){
    throw new ExpressError(400,result.error);
  }else{
    next();
  }
};

//index and post route

router
  .route("/")
   .get( wrapAsync(async (req, res) => {
   
      const allListings = await Listing.find({});
      console.log(req.user);
      res.render("listings/index.ejs", { allListings});
      req.flash("error");
    }))
    .post(isLoggedIn,upload.single("listing[image]"),validatelisting, wrapAsync(async (req, res) => {

    

    if(typeof req.file!= "undefined"){
      let url= req.file.path;
      let filename= req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.owner= new mongoose.Types.ObjectId(req.user._id);
      newListing.image={url,filename};
    
    
      
     await newListing.save();
    }
    
     req.flash("success" , "new listing created");
     res.redirect("/bylistings");
    })
      
  );


    
//New Route
router.get("/new",isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

//show route ,update route and delete route

router
  .route("/:id")
   .get( wrapAsync(async (req, res) => {
     let { id } = req.params;
     const listing = await Listing.findById(id).populate({path:"reviews",
     populate : {
      path : "author",
    },
    })
    
      if(!listing){
       req.flash("error" , "listing does not exist");
      res.redirect("/bylistings");
    }
       res.render("listings/show.ejs", { listing , mapboxToken:process.env.MAP_TOKEN});
   }))
   .put(isLoggedIn, upload.single("listing[image]"),validatelisting , wrapAsync(async (req, res) => {
     let { id } = req.params;
    let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined"){
     let url = req.file.path;
     let filename = req.file.filename;
     listing.image = {url,filename};
     await listing.save();
    }
     if(!req.body.listing){
    throw new ExpressError(400,"send a valid response");
    }
     req.flash("success" , "listing updated successfully!");
     res.redirect(`/bylistings/${id}`);
    }))
    .delete(isLoggedIn, wrapAsync(async (req, res) => {
      let { id } = req.params;
       let deletedListing = await Listing.findByIdAndDelete(id);
      req.flash("success","listing deleted successfully!!");
      console.log(deletedListing);
      res.redirect("/bylistings");
    }));


//Edit Route
router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  
  if(!listing){
    req.flash("error" , "listing does not exist");
    res.redirect("/bylistings");
  }
  res.render("listings/edit.ejs", { listing });
}));





module.exports = router;