
'use strict';

let express  = require('express');
let router   = express.Router();

let trataError = require('../../lib/trataError');

let mongoose = require('mongoose');
let Token    = mongoose.model('Token');

router.post('/', function(req , res) {
    var newToken = { plataforma: req.body.plataforma, token: req.body.token, usuario: req.body.usuario};
    if (!newToken.token) {
        return trataError({code:401, message: 'TOKENPUSH_REQUIRED'}, req.query.lang, res);
    }
    if (!newToken.plataforma) {
        return trataError({code: 401, message: 'PLATFORM_REQUIRED'}, req.query.lang, res);
    }
    if (newToken.plataforma.toLocaleLowerCase() !== 'android' &&
        newToken.plataforma.toLocaleLowerCase() !== 'ios') {
        return trataError({code:401, message: 'INVALID_PLATFORM'}, req.query.lang, res);
    }
    Token.new(newToken, function (err) {
        if (err) {
            return trataError({code:401, message: 'UNKNOWN'}, req.query.lang, res);
        }
        // Devuelve confirmación.
        return res.json({ok: true, tokenPush: newToken.token});
    });
});

module.exports = router;
