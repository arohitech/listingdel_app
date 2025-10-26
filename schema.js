const joi = require("joi");
const Listing = require("./models/listing");
const Joi = require("joi");
const review = require("./models/review");



module.exports.listingSchema = Joi.object({
     listing:Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0), //*min means negative na ho*//
     }).required()
    
    
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
       rating : Joi.number().cast('string').required().min(1).max(5),
        Comment : Joi.string().required(),
    }).required()

    
});

