const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn , reviewAuthor } = require("../middleware.js");



const validateReview = (req,res,next) =>{
  let result = reviewSchema.validate(req.body);
  
  if(result.error){
    throw new ExpressError(400,result.error);
  }else{
    next();
  }
};



router.post("/", isLoggedIn, validateReview, async(req,res) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
  const newreviewdata = {...req.body.review,rating : parseInt(req.body.review.rating,5),};

  let newreview = new Review(newreviewdata);
  newreview.author = req.user._id;
  listing.reviews.push(newreview);
  await newreview.save();
  await listing.save();
   req.flash("success" , "new review created successfully !");
  res.redirect(`/bylistings/${id}`);
});

router.delete("/:reviewID" , isLoggedIn , reviewAuthor, wrapAsync(async(req,res) => {
  let {id , reviewID} = req.params;
  await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewID}});
  await Review.findByIdAndDelete(reviewID);
  req.flash("success" , "review deleted successfully !");

  res.redirect(`/bylistings/${id}`);
}));


module.exports = router;
