
'use strict';

var mongoose = require('mongoose');
var db = mongoose.connection;

// Handlers de eventos de conexión.

db.on('error', function(err) {
    console.log(err);
    process.exit(1);
});

db.once('open', function() {
    console.log('Conectado a mongodb');
});

// Conectar a la Base de Datos.

mongoose.connect('mongodb://localhost/nodepop');

// Cargamos definiciones de nuestros modelos.

require('./Anuncio');
require('./Usuario');
require('./Token');

module.exports = db;
