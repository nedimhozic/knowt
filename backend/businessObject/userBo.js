var Promise = require('bluebird');

var User = require('../models/user');
var Auth = require('../helpers/authentication');
var EmailClient = require('../helpers/emailClient');
var HttpStatus = require('../helpers/statuses');

var ErrorResponse = {
    status: 500,
    error: ''
};

//Register User
module.exports.register = function (reqUser) {
    let token = Auth.getToken(reqUser);

    return new Promise((resolve, reject) => {
        if (!reqUser.email || !reqUser.password || !reqUser.firstName || !reqUser.lastName) {
            ErrorResponse.status = HttpStatus.BadRequest;
            ErrorResponse.error = 'Bad Data';
            reject(ErrorResponse);
            return;
        }

        let newUser = new User({
            email: reqUser.email,
            password: reqUser.password,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            verified: true
        });

        User.getUserByUsername(newUser.email, (err, user) => {
            if (err) {
                ErrorResponse.status = HttpStatus.InternalServerError;
                ErrorResponse.error = err;
                reject(ErrorResponse);
                return;
            }
            if (user) {
                ErrorResponse.status = HttpStatus.Forbidden;
                ErrorResponse.error = 'There is already user with this email';
                reject(ErrorResponse);
                return;
            }
        });

        let response = {
            status: HttpStatus.Created,
            data: {
                token: token
            }
        };
        resolve(response);
        EmailClient.verifyAccount(newUser.email, newUser.lastName, newUser.firstName, token);
    });
}

//Login
module.exports.login = function (username, password, token) {
    return new Promise((resolve, reject) => {
        if (token) {
            let jwtData = Auth.check(token);
            console.log(jwtData);
            if (!jwtData.data) {
                ErrorResponse.status = HttpStatus.Unauthorized;
                ErrorResponse.error = 'Invalid Token';
                reject(ErrorResponse);
                return;
            }
            var reqUser = jwtData.data;
            if (reqUser.email == username && reqUser.password == password) {
                let newUser = new User({
                    email: reqUser.email,
                    password: reqUser.password,
                    firstName: reqUser.firstName,
                    lastName: reqUser.lastName,
                    verified: true,
                    contractors: []
                });

                User.createUser(newUser, (err, user) => {
                    if (err) {
                        ErrorResponse.status = HttpStatus.InternalServerError;
                        ErrorResponse.error = err;
                        reject(ErrorResponse);
                        return;
                    }

                    let response = {
                        status: HttpStatus.Created,
                        data: {
                            token: Auth.getToken(user),
                            id: user._id
                        }
                    }
                    resolve(response);
                    return;
                });
            } else {
                ErrorResponse.status = HttpStatus.Unauthorized;
                ErrorResponse.error = 'Wrong credentials';
                reject(ErrorResponse);
                return;
            }
        } else {
            User.getUserByUsername(username, (err, user) => {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                if (!user) {
                    ErrorResponse.status = HttpStatus.Forbidden;
                    ErrorResponse.error = 'User is not verified';
                    reject(ErrorResponse);
                    return;
                } else {
                    User.comparePassword(password, user.password, (err, isMatch) => {
                        if (err) {
                            ErrorResponse.status = HttpStatus.InternalServerError;
                            ErrorResponse.error = err;
                            reject(ErrorResponse);
                            return;
                        }
                        if (isMatch) {
                            let response = {
                                status: HttpStatus.Accepted,
                                data: {
                                    token: Auth.getToken(user),
                                    id: user._id
                                }
                            }
                            resolve(response);
                            return;
                        } else {
                            ErrorResponse.status = HttpStatus.Unauthorized;
                            ErrorResponse.error = 'Wrong password';
                            reject(ErrorResponse);
                            return;
                        }
                    });
                }
            });
        }
    });
}

//Forgot password
module.exports.forgotPassword = function (email) {
    return new Promise((resolve, reject) => {
        User.getUserByUsername(email, (err, user) => {
            if (err) {
                ErrorResponse.status = HttpStatus.InternalServerError;
                ErrorResponse.error = err;
                reject(ErrorResponse);
                return;
            }

            if (!user) {
                ErrorResponse.status = HttpStatus.BadRequest;
                ErrorResponse.error = 'User is not registered';
                reject(ErrorResponse);
                return;
            } else {
                let response = {
                    status: HttpStatus.Accepted,
                    data: 'Success'
                };
                resolve(response);

                let token = Auth.getToken(user, '1h');
                EmailClient.forgotPassword(user.email, user.lastName, user.FirstName, token);
            }
        });
    });
}

//Update password
module.exports.updatePassword = function (password, token) {
    return new Promise((resolve, reject) => {
        let jwtData = Auth.check(token);
        if (!jwtData.data) {
            ErrorResponse.status = HttpStatus.Unauthorized;
            ErrorResponse.error = 'Token has expired';
            reject(ErrorResponse);
            return;
        }
        let reqUser = jwtData.data;
        reqUser.password = password;


        User.updateUser(reqUser, (err, user) => {
            if (err) {
                ErrorResponse.status = HttpStatus.InternalServerError;
                ErrorResponse.error = err;
                reject(ErrorResponse);
                return;
            }
            if (!user) {
                ErrorResponse.status = HttpStatus.BadRequest;
                ErrorResponse.error = 'User is not registered';
                reject(ErrorResponse);
                return;
            } else {
                let response = {
                    status: HttpStatus.Accepted,
                    data: 'Success'
                };
                resolve(response);
            }
        });
    });
}