var jwt = require('jsonwebtoken');
var config = require('../config');
var Promise = require('bluebird');
var HttpStatus = require('./statuses');

var ErrorResponse = {
    status: 0,
    error: ''
};

module.exports.checkToken = function (token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            ErrorResponse.status = HttpStatus.Unauthorized;
            ErrorResponse.error = 'Missing Token';
            reject(ErrorResponse);
            return;
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                ErrorResponse.status = HttpStatus.Unauthorized;
                ErrorResponse.error = 'Invalid Token';
                reject(ErrorResponse);
                return;
            } else {
                resolve(decoded);
            }
        });
    });
}

module.exports.getToken = function (user, duration) {
    var tokenDuration = '168h';
    if(duration) {
        tokenDuration = duration;
    }
    return jwt.sign({
        data: user
    }, config.secret, { expiresIn: duration });
}

module.exports.check = function (token) {
    return jwt.verify(token, config.secret);
}