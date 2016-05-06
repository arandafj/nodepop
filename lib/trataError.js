
'use strict';

var traduceError = require('./traduceError');

module.exports = function(error, lang, res) {

    traduceError(error.message, lang, function(err, msg) {
        if (err) {
            return res.json({ ok: false, error: {code: 500, message: 'TRADUCTION ERROR'}});
        }
        return res.json({ ok: false, error: {code: error.code, message: msg}});
    });

};

