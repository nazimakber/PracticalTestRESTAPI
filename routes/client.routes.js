module.exports = (app) => {
    const Client = require('../store/controllers/client.contoller');

    // Create a new Client
    app.post('/client', Client.create);

    // Retrieve all Client
    app.get('/client', Client.findAll);

    // Retrieve a single Client with clientid
    app.get('/client/:clientid', Client.findOne);

    // Update a Note with clientid
    app.put('/client/:clientid', Client.update);

    // Delete a Note with clientid
    app.delete('/client/:clientid', Client.delete);

    // Add multiple clients
    //app.post('/client', Client.createClients);

}