
'use strict';

let mongoose = require('mongoose');

// Definir esquema de anuncio.

let tagsPermitidos = ['work', 'lifestyle', 'motor', 'mobile']; // Tags que se permiten usar. 

let anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: {type: [String], enum: tagsPermitidos}
});

// Métodos estáticos.

anuncioSchema.statics.tagsPosibles = function () {
    return tagsPermitidos;

};

anuncioSchema.statics.new = function(datos, cb) {
    var anuncio = new Anuncio(datos);

    anuncio.save(function (err) {
        if (err) {
            return cb(err);
        }
        console.log('Anuncio ' + anuncio.nombre + ' creado');
        return cb(null);
    });
};

// Borra todos los anuncios de la BD.

anuncioSchema.statics.deleteAll = function(cb) {
    Anuncio.remove({}, function(err) {
        if (err) {
            return cb(err);
        }
        console.log('BD Anuncios borrados');
        return cb(null);
    });
};

// Devuelve una lista con filtros de la BD.

anuncioSchema.statics.list = function( criterios, cb) {
    let filtros = {};

    if (typeof criterios.tags !== 'undefined') {
        filtros.tags = criterios.tags;
    }

    if (typeof criterios.venta !== 'undefined') {
        filtros.venta = criterios.venta;
    }

    switch (criterios.precio) {
        case '10-50':
            filtros.precio =  { '$gte': '10', '$lte': '50' };
            break;
        case '10-':
            filtros.precio = { '$gte': '10' };
            break;
        case '-50':
            filtros.precio = { '$lte': '50' };
            break;
        case '50':
            filtros.precio = '50';
            break;
        default:
            break; // Si no es una de las opciones no se incluye el filtro
    }

    if (typeof criterios.nombre !== 'undefined') {
        filtros.nombre = new RegExp('^' + criterios.nombre, 'i');
    }

    var query = Anuncio.find(filtros); // Uso un find sin callback para que me de un objeto query sin ejecutar.

    query.sort(criterios.sort || '_id');
    query.skip(parseInt(criterios.start) || 0);
    query.limit(parseInt(criterios.limit) || 1000);

    query.exec( function(err, rows) { // Ejecuta el query con los filtros y parámetros añadidos.
        if (err) {
            return cb(err);
        }
        return cb(null, rows);
    });
};


// Exportar.

var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
