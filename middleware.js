const listing = require("./models/listing");
const review = require("./models/review");
const {listingSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/expressError.js");



module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
    req.session.redirecturl = req.orignalUrl;
    req.flash("error" , "you must be loggedin to create new listings");
    return res.redirect("/login");  
    }
    return next();
};


module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirecturl){
      res.locals.redirecturl = req.session.redirecturl;
    }
   return next();
};



module.exports.reviewAuthor = async(req,res,next) => {
  let{id,reviewID} = req.params;
  let review = await review.findById(reviewID);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error", "you are not the author of this comment!");
    return res.redirect(`/bylistings/${id}`);
  }
  next();
};