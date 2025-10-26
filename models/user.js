const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },

    emailId : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user" , userSchema , "user");