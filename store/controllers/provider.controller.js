const Provider = require('../models/provider.model');

// Request validation
const requiredValidatation =(req) =>{
    if(!req.body) {
        return res.status(400).send({
            message: "Provider content can not be empty"
        });
    }
}

//Create new Provider
exports.create = (req, res) => {
    
    requiredValidatation(req);

    // Create a Provider
    const provider = new Provider({
        name: req.body.name || "No provider name"
    });


    // Add Provider
    provider.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the provider."
        });
    });

};



// Update a Provider
exports.update = (req, res) => {
    requiredValidatation(req);

    // Find and update provider with the request body
    Provider.findByIdAndUpdate(req.params.providerid, {
        name: req.body.name || "No provider name"
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerid
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerid
            });                
        }
        return res.status(500).send({
            message: "Something is wrong updating provider with id " + req.params.providerid
        });
    });
};



// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Provider.findByIdAndRemove(req.params.providerid)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Provider is not available with id " + req.params.providerid
            });
        }
        res.send({message: "Provider deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerid
            });                
        }
        return res.status(500).send({
            message: "Could not delete Provider with id " + req.params.providerid
        });
    });
};





// Retrieve all Provider from the database.
exports.findAll = (req, res) => {
    Provider.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving provider."
        });
    });
};

// Find a single Provider with a Providerid
exports.findOne = (req, res) => {
    Provider.findById(req.params.providerid)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerid
            });            
        }
        res.send(provider);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving provider with id " + req.params.providerId
        });
    });
};


// Add multiple / bulk provider
exports.createProviders = (req, res) => {
    
    requiredValidatation(req);

    // Save Provider in the MongoDB
    Provider.insertMany(req)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the providers."
        });
    });

};