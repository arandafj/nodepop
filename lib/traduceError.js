
'use strict';

module.exports = function(mensaje, idioma, cb) {

    if (typeof idioma == 'undefined' || idioma !== 'en') {
        idioma = 'es'; // Por defecto español.
    }
    return cb(null, JSON.parse(global.errores)[idioma][mensaje]);
};

