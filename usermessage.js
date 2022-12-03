const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Invalid email id")
        //     }
        // }
    },

    course: {
        type: String,
        required: true,

    },

    message: {
        type: Number,
        required: true,
        minLength: 30
    }
})

// we need a collection

const USERS = mongoose.model("User", userSchema);

module.exports = USERS;