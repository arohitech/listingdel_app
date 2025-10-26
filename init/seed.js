
  require('dotenv').config();

const mongoose = require("mongoose");
const {data}= require("./data.js");
const Listing = require("../models/listing.js");
const url = process.env.URL;

async function seedDB() {
  await Listing.deleteMany({});
  await Listing.insertMany(data);
  console.log("Database seeded!");
}
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";
mongoose.connect(process.env.DB_URL,{
     useNewUrlParser : true,
     useUnifiedTopology : true,
  })
    .then(() => {
        console.log("MongoDB connected");
        seedDB()
        .then(() => {
          mongoose.connection.close();
          console.log("Connection closed");
        })
        .catch((err) => {
          console.error(err);
        });
    })
  

