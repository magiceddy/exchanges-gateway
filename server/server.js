const Hapi = require('hapi');
const plugins = require('./modules/plugins');
const routes = require('./init/routes');

const start = (host, port) => {
    return new Promise((resolve, reject) => {

        // create the server
        const server = new Hapi.Server();
        server.connection({ host, port });

        // Register all the plugins
        server.register(plugins, (err) => {
            if (err) {
                return reject(err);
            }
        });

        // Initialize routes
        server.route(routes(server));

        // Start accepting requests
        server.start((err) => {
            if (err) {
                return reject(err);
            }
        });
    });
};

module.exports = start;
