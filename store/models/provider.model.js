//const { connection } = require('../DataAccessLayer.js');
const mongoose = require('mongoose');

const providersList = new mongoose.Schema(
    {
        id:{
            type:Number,
            required: true
        },
        name:{
            type:String,
            required: true
        }
    }   
);

module.exports = mongoose.model("Providers",providersList);