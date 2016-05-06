'use strict';

let express  = require('express');
let router   = express.Router();

let mongoose = require('mongoose');
let Anuncio  = mongoose.model('Anuncio');

let trataError = require('../../lib/trataError');

// GET lista de tags disponibles.

router.get('/tags', function(req, res) {
    res.json({ok: true, tagsPosibles: Anuncio.tagsPosibles()});
});

// Autenticación con JWT.

var jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth());

// GET lista de anuncios con filtros para usuarios registrados.

router.get('/lista', function(req, res) {
    Anuncio.list(req.query, function(err, results) {
        if (err) {
            //res.json({ok: false, error: err});
            console.log(err);
            trataError({code:401, message: err.message || 'UNKNOWN'}, req.query.lang, res);
        }
        //console.log(rows);
        res.json({ok: true, anuncios: results});
    });
});

module.exports = router;
