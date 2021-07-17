const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ShowModel = new mongoose.Schema(
    {
        showname : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        category : {
            type : ObjectId,
            ref : "Category",
            required : true 
        },
        photo : {
            type : String,
            required : true
        },
        duration : {
            type : Number,
            required : true
        },
    },
    { timestamps : true},
);

module.exports = mongoose.model("Show",ShowModel)

