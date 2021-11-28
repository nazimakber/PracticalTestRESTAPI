const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Get the database URL
const db = require('./database.config');

module.exports = mongoose.connect(db.url + db.schema, {useNewUrlParser : true, useUnifiedTopology:true}).
then(()=>{
    console.log("Mongo Successfully Connected");
}).catch((err)=>{
    console.log("Mongo could not be connected.", err);
    process.exit();
});

//module.exports={ connection };
