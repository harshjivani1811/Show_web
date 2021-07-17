const mongoose = require("mongoose");
const crypto = require("crypto");
const {v4 : uuidv4} = require("uuid");

const UserModel = new mongoose.Schema(
    {
        firstname : {
            type : String,
            trim : true,
            maxlength : 32,
            required : true
        },
        lastname : {
            type : String,
            trim : true,
            maxlength : 32,
            required : true,
        },
        email: {
            type : String,
            trim : true,
            mexlength : 50,
            required : true
        },
        encrypt_password : {
            type : String,
            required : true 
        },
        salt : String,
        role : {
            type : Number,
            default : 0
        },
        subscription : Boolean,
    },
    { timestamps : true}
);

UserModel.virtual ("password")
.set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.encrypt_password = this.securePassword(password)
})

UserModel.methods = {
    authenticate : function(password) {
        return this.securePassword(password) === this.encrypt_password;
    },
    securePassword : function (password) {
        if(!password) {
            return "";
        }
        try {
            return crypto
            .createHmac("MD5",this.salt)
            .update(password)
            .digest("hex")
        } catch (error) {
            console.log(erro);
            return "";
        }
    }
}

module.exports = mongoose.model("User",UserModel);