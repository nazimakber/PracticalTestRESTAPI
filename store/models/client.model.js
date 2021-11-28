//const { connection } = require('../DataAccessLayer');
const mongoose = require('mongoose');

const clientsList = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true
        },
        phone:Number,
        providers:Array,
        date:{
            type:Date,
            default: Date.now
        }
    }   
);


module.exports = mongoose.model("Clients",clientsList);