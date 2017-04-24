var Promise = require('bluebird');

var Contractor = require('../models/contractor');
var Auth = require('../helpers/authentication');
var HttpStatus = require('../helpers/statuses');

var ErrorResponse = {
    status: 500,
    error: ''
};

module.exports.getContractors = function (token, userId) {
    return new Promise((resolve, reject) => {
        Auth.checkToken(token).then(() => {
            if (!userId) {
                ErrorResponse.status = HttpStatus.BadRequest;
                ErrorResponse.error = "You need to send userId";
                reject(ErrorResponse);
                return;
            }
            Contractor.getAllContractors(userId, (err, contractors) => {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                let response = {
                    status: HttpStatus.Accepted,
                    data: contractors
                }
                resolve(response);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports.getContractorById = function (token, id) {
    return new Promise((resolve, reject) => {
        Auth.checkToken(token).then(() => {
            Contractor.getById(id, (err, contractor) => {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                let response = {
                    status: HttpStatus.Accepted,
                    data: contractor
                };
                resolve(response);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports.createContractor = function (token, contractor) {
    return new Promise((resolve, reject) => {
        Auth.checkToken(token).then((decodedUser) => {
            var image = contractor.image;
            if (!contractor.name) {
                ErrorResponse.status = HttpStatus.BadRequest
                ErrorResponse.error = 'Bad Data';
                reject(ErrorResponse);
                return;
            } else {
                var newContractor = new Contractor({
                    name: contractor.name,
                    userId: decodedUser.data._id,
                    tasks: []
                });
                console.log(decodedUser);
                Contractor.createContractor(newContractor, (err, contractor) => {
                    if (err) {
                        rErrorResponse.status = HttpStatus.InternalServerError;
                        ErrorResponse.error = err;
                        reject(ErrorResponse);
                        return;
                    }
                    Contractor.saveImage(contractor._id, image);
                    let response = {
                        status: HttpStatus.Created,
                        data: contractor
                    }
                    resolve(response);
                });
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports.deleteContractor = function (token, id) {
    return new Promise((resolve, reject) => {
        Auth.checkToken(token).then((decodedUser) => {
            Contractor.deleteContractor(id, (err, contractor) => {
                if (err) {
                    rErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                let response = {
                    status: HttpStatus.Accepted,
                    data: contractor
                };
                resolve(response);
            });
        }).catch((error) => {
            ErrorResponse.status = HttpStatus.InternalServerError;
            ErrorResponse.error = error;
            reject(ErrorResponse);
        });
    });
}

module.exports.updateContractor = function (token, contractor) {
    return new Promise((resolve, reject) => {
        Auth.checkToken(token).then(() => {
            if (!contractor || !contractor._id) {
                ErrorResponse.status = HttpStatus.BadRequest
                ErrorResponse.error = 'Bad Data';
                reject(ErrorResponse);
                return;
            } else {
                Contractor.updateContractor(contractor, function (err, contractor) {
                    if (err) {
                        rErrorResponse.status = HttpStatus.InternalServerError;
                        ErrorResponse.error = err;
                        reject(ErrorResponse);
                        return;
                    }
                    let response = {
                        status: HttpStatus.Accepted,
                        data: contractor
                    };
                    resolve(response);
                });
            }
        }).catch((error) => {
            reject(error);
        });
    });
}