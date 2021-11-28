const Client = require('../models/client.model.js');

// Request validation
const requiredValidatation =(req) =>{
    if(!req.body) {
        return res.status(400).send({
            message: "Client content can not be empty"
        });
    }
}

//Create new Client
exports.create = (req, res) => {
    
    requiredValidatation(req);

    // Create a Client
    const client = new Client({
        name: req.body.name || "No client name", 
        email: req.body.email,
        phone: req.body.phone,
        providers: req.body.providers
    });


    // Save Client in the MongoDB
    client.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the client."
        });
    });

};



// Update a Client
exports.update = (req, res) => {
    requiredValidatation(req);
    

    // Find and update client with the request body
    Client.findByIdAndUpdate(req.params.clientid, {
        name: req.body.name, 
        email: req.body.email,
        phone: req.body.phone,
        providers: req.body.providers
    }, {new: true})
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientid
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientid
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.clientid
        });
    });
};



// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientid)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client is not available with id " + req.params.clientid
            });
        }
        res.send({message: "Client deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientid
            });                
        }
        return res.status(500).send({
            message: "Could not delete client with id " + req.params.clientid
        });
    });
};





// Retrieve all client from the database.
exports.findAll = (req, res) => {
    Client.find({})
    .then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || "Something wrong while retrieving clients."
        });
    });
};

// Find a single client with a clientid
exports.findOne = (req, res) => {
    Client.findById(req.params.clientid)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientid
            });            
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving client with id " + req.params.clientId
        });
    });
};


// Add multiple / bulk clients
exports.createClients = (req, res) => {
    
    requiredValidatation(req);


    // Save Client in the MongoDB
    Client.insertMany(req)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the clients."
        });
    });

};