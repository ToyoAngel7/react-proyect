const express    = require('express');
const http       = require('http');
const Socketio   = require('socket.io');
const path       = require('path');

const Sockets    = require('./sockerts');


class Server {

    constructor() {
         
        this.app  = express();
        this.port = process.env.PORT;

        // Http serveer
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = Socketio( this.server, {/* configuraciones*/} );
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

    }

    configurarSockets() {
        new Sockets( this.io );
    }




    execute() {
        // Inicializar middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar el server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });



    }




}

module.exports = Server;
