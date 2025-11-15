if(process.env.NODE_ENV !== "production"){
require('dotenv').config({path:__dirname + '../../.env'});
}

const mongoose = require("mongoose");
const {data}= require("./data.js");
const Listing = require("../models/listing.js");
const url = process.env.MONGODB_URL;

async function seedDB() {
  await Listing.deleteMany({});
  await Listing.insertMany(data);
  console.log("Database seeded!");
}

mongoose.connect(url)
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
  

