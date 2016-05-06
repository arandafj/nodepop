
'use strict';

var db       = require('./models/db');
var mongoose = require('mongoose');

var readLine = require('readline');
var async    = require('async');
var fs       = require('fs');
var path     = require('path');

const ruta   = path.join('./', 'cargaDB.json');

db.once('open', function() {
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Are you sure you want to empty DB? (no) ', function(answer) {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            runInstallScript();
        } else {
            console.log('DB install aborted!');
            return process.exit(0);
        }
    });

});

function runInstallScript() {
    async.series([
        initAnuncios,
        initUsuarios
    ], function (err) {
        if (err) {
            console.error('Hubo un error: ', err);
            return process.exit(1);
        }
        return process.exit(0);
    });
}

function initAnuncios(cb) {
    var Anuncio = mongoose.model('Anuncio');

    // Elimino todos.
    Anuncio.deleteAll( function() {
        fs.readFile(ruta, function(err, data) {
            if (err) {
                console.log('Error al abrir archivo JSON');
                return cb(err);
            }
            var arr = JSON.parse(data).anuncios;
            async.concat(arr, Anuncio.new, cb);
        });
    });
}

function initUsuarios(cb) {
    var Usuario = mongoose.model('Usuario');

    // Elimino todos.
    Usuario.deleteAll( function() {
        fs.readFile(ruta, function(err, data) {
            if (err) {
                console.log('Error al abrir archivo JSON');
                return cb(err);
            }
            var arr = JSON.parse(data).usuarios;
            async.concat(arr, Usuario.new, cb);
        });
    });
}
