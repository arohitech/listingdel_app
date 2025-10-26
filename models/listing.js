const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./user.js");
const { required } = require("joi");


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url: {
      type: String,
  },
  filename : String,
},

  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type : Schema.Types.ObjectId,
      ref : "review"
    }
  ],
  owner : {
    type : Schema.Types.ObjectId,
    ref : "user",
    required : true
  },
  category : {
    type : String,
    enum : ["Farms","Arctic","Amazing Pools","Desserts","Castles","Camping","Mountains","Trending","Rooms","Iconic Cities"],
  },
 // geometry : {
   // type:{
    //  type:["Point"],
   //   required : true
  //  },
   // coordinates:{
  //    type:[Number],
   //   required: true
    //}
  }

);

//* to delete all the reviews automatically when a listing is deleted *//

listingSchema.post("findOneAndDelete" , async(req,res) => {
  const review = require("./review.js");
  if(Listing){
    await review.deleteMany({_id : {$in : Listing.reviews}});
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

//*listing here is a object or model that is storing data schema*//