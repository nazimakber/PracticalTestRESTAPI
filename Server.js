const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse request 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

//Enable Cors for HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Add file routes
require('./routes/client.routes.js')(app);
require('./routes/provider.routes.js')(app);

const connection = require('./store/DBconnection');

//define a simple route
app.get('/',(req,res) => {
    res.json({"message":"Welcome to practical Test applications."});

});


//listen for request
app.listen(3000,()=>{
    console.log("Server is listening on port");
});