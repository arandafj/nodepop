
'use strict';

let express    = require('express');
let router     = express.Router();

let mongoose   = require('mongoose');
let Usuario    = mongoose.model('Usuario');

let trataError = require('../../lib/trataError');

let jwt        = require('jsonwebtoken');
let config     = require('../../local_config');

let createHash = require('sha.js');
let sha256     = createHash('sha256');

router.post('/authenticate', function(req, res) {

    // find the user
    Usuario.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({ok: false, error: {code: 500, message: err.message} });
        }
        if (!user) {
            //return res.json({ ok: false, error: {code: 401, message: 'Authentication failed. User not found.' }});
            return trataError({code: 401, message: 'USER_NOT_FOUND' }, req.body.lang, res);
        }
        else if (user) {
            // check if password matches
            var claveHash = sha256.update(req.body.password, 'utf8').digest('hex');
            if (user.clave != claveHash) {
                return trataError({code: 401, message: 'AUTH_FAIL' }, req.body.lang, res);
                
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.jwt.secret, {
                    expiresIn: config.jwt.expiresIn
                });
                // return the information including token as JSON
                return res.json({ok: true, token: token});
            }
        }
    });
});

router.post('/register', function(req , res){
    var newUser = { nombre: req.body.nombre, email: req.body.email, clave: req.body.clave};
    if (!newUser.nombre) {
        return trataError({code:401, message: 'NAME_REQUIRED'}, req.query.lang, res);
    }
    if (!newUser.email) {
        return trataError({code: 401, message: 'EMAIL_REQUIRED'}, req.query.lang, res);
    }
    if (!newUser.clave) {
        return trataError({code:401, message: 'PASSWORD_REQUIRED'}, req.query.lang, res);
    }
    // console.log('newUser', req.body.nombre,  req.body.email, req.body.clave);
    Usuario.new(newUser, function (err) {
        if (err) {
            return trataError({code:401, message: 'UNKNOWN'}, req.query.lang, res);
        }
        return res.json({ok: true, usuario: newUser.nombre});
    });
});

module.exports = router;