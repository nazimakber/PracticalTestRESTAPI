module.exports = (app) => {
    const Provider = require('../store/controllers/provider.controller');

    // Create a new Provider
    app.post('/provider', Provider.create);

    // Retrieve all Provider
    app.get('/provider', Provider.findAll);

    // Retrieve a single Client with providerid
    app.get('/provider/:providerid', Provider.findOne);

    // Update a Note with providerid
    app.put('/provider/:providerid', Provider.update);

    // Delete a Note with providerid
    app.delete('/provider/:providerid', Provider.delete);

    // Add multiple Providers
    //app.post('/provider', Provider.createProvider);

}