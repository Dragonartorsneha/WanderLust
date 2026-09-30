const Listing =require("./models/listing.js")

const ExpressError=require("./utils/ExpressError.js");
const {listingschema , reviewschema} = require("./Schema.js");
const Review = require("./models/review.js");

module.exports.validatereview = (req, res, next) => {
    const { error } = reviewschema.validate(req.body);   // 1. validate first


  if (error) {
    const errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  }
  next();
};
module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","you must be logged in to create listings!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res, next) =>{
     let { id } = req.params;
     let listing = await Listing.findById(id);
     if (!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
     }
     next();
};
 module.exports.validatelisting = (req,res,next) =>{
     let {error}=listingschema.validate(req.body);
     
     if(error){
         let errmsg = error.details.map((el) => el.message).join(",");
         throw new ExpressError(400,errmsg);
     }else{
         next();
     }
     
 };
 module.exports.isReviewAuthor = async (req,res, next) =>{
     let {id, reviewId } = req.params;
     let review = await Review.findById(reviewId);
     if (!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You did not create this review");
        return res.redirect(`/listings/${id}`);
     }
     next();
};