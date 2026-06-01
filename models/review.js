
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const revewSchema=new Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
    },
     comment:{
        type:String,
    },
    createAt:{
        type:Date,
        default:Date.now,
    },
    author:{
     type:Schema.Types.ObjectId,
     ref:"User"
    }
})

module.exports=mongoose.model("Review",revewSchema);