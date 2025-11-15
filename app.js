if(process.env.NODE_ENV !== "production"){
require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
//*in this way we are exporting that specific object from schema.js*//
const review = require("./models/review.js");
const listingrouter = require("./ROUTES/listing.js");
const reviewrouter = require("./ROUTES/review.js");
const userrouter = require("./ROUTES/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js");
const { storage } = require("./cloudConfig.js");
const Mongostore = require("connect-mongo");





main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  mongoose.connect(process.env.MONGODB_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "public")));


const store = Mongostore.create({
  mongoUrl: process.env.MONGODB_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});


const sessionoptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httponly: true
  },
};


app.use(session(sessionoptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use((req, res, next) => {
  console.log(req.user);
  res.locals.currUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


app.use("/bylistings", listingrouter);
app.use("/bylistings/:id/review", reviewrouter);
app.use("/", userrouter);



app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
});

app.listen(8080, () => {
  console.log("server is listening to port");
});