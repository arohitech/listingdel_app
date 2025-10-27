
listingSchema.post("findOneAndDelete" , async(req,res) => {
  if(Listing){
    await review.deleteMany({_id : {$in : Listing.reviews}});
  }
});


//post() is a monngoose middleware method 
//.post("findanddelete") means run a function after  document is deleted using  findoneanddelete()
//(Listing) means if that listing is deleted then go delete all reviews of that listing 
//listingg.reviews means to delete all those reviews whose id is in the array of review's id in that deleted listing 
//in listingschma reviews=[1,2,3,4...] these are reviwes per listing



//WRAPASYNC function was made so that u dont have to write try catch again and again


 // const maptoken ="<%=process.env.MAP_TOKEN %>";
 // const coordinates = 
  //"<%-JSON.stringify(listing.geometry.coordinates)%>";
