
'use strict';

var mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {type: String, index: true },
    clave: String
});

// Métodos estáticos.

usuarioSchema.statics.deleteAll = function(cb) {
    Usuario.remove({}, function(err) {
        if (err) {
            return cb(err);
        }
        console.log('BD Usuarios borrados');
        return cb(null);
    });
};

usuarioSchema.statics.new = function(datos, cb) {
    var createHash = require('sha.js');
    var sha256 = createHash('sha256');
    var claveHash = sha256.update(datos.clave, 'utf8').digest('hex');

    var usuario = new Usuario({nombre: datos.nombre, email: datos.email, clave: claveHash});

    usuario.save(function (err) {
        if (err){
            return cb(err);
        }
        console.log('Usuario ' + usuario.nombre + ' creado'); 
        return cb(null);
    });
};


// Exportar.

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;