var Promise = require('bluebird');

var Task = require('../models/task');
var Auth = require('../helpers/authentication');
var HttpStatus = require('../helpers/statuses');

var ErrorResponse = {
    status: 500,
    error: ''
};

module.exports.getTasks = function (token, userId, date) {
    return new Promise((resolve, reject) => {
        Auth.checkToken(token).then(() => {
            if (!userId || !date) {
                ErrorResponse.status = HttpStatus.BadRequest;
                ErrorResponse.error = "You need to specify parameters both 'userId' and 'date'";
                reject(ErrorResponse);
                return;
            }
            Task.getAllTasks(userId, date, (err, tasks) => {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                let response = {
                    status: HttpStatus.Accepted,
                    data: tasks
                }
                resolve(response);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports.getTaskById = function (token, id) {
    return new Promise((resolve, reject) => {
        Auth.checkToken(token).then(() => {
            Task.getById(id, (err, task) => {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                let response = {
                    status: HttpStatus.Accepted,
                    data: task
                };
                resolve(response);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports.createTask = function (token, task) {
    return new Promise((resolve, reject) => {
        Auth.checkToken(token).then(() => {
            if (!task.title) {
                ErrorResponse.status = HttpStatus.BadRequest
                ErrorResponse.error = 'Bad Data';
                reject(ErrorResponse);
                return;
            } else {
                var newTask = new Task({
                    title: task.title,
                    description: task.description,
                    approved: task.approved,
                    date: task.date,
                    contractorId: task.contractorId
                });

                Task.createTask(newTask, (err, task) => {
                    if (err) {
                        rErrorResponse.status = HttpStatus.InternalServerError;
                        ErrorResponse.error = err;
                        reject(ErrorResponse);
                        return;
                    }
                    let response = {
                        status: HttpStatus.Created,
                        data: task
                    }
                    resolve(response);
                });
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports.deleteTask = function (token, id) {
    return new Promise((resolve, reject) => {
        Auth.checkToken(token).then(() => {
            Task.deleteTask(id, (err, task) => {
                if (err) {
                    rErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                let response = {
                    status: HttpStatus.Accepted,
                    data: task
                };
                resolve(response);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports.updateTask = function (token, task) {
    return new Promise((resolve, reject) => {
        Auth.checkToken(token).then(() => {
            if (!task || !task._id) {
                ErrorResponse.status = HttpStatus.BadRequest
                ErrorResponse.error = 'Bad Data';
                reject(ErrorResponse);
                return;
            } else {
                Task.updateTask(task, function (err, task) {
                    if (err) {
                        rErrorResponse.status = HttpStatus.InternalServerError;
                        ErrorResponse.error = err;
                        reject(ErrorResponse);
                        return;
                    }
                    let response = {
                        status: HttpStatus.Accepted,
                        data: task
                    };
                    resolve(response);
                });
            }
        }).catch((error) => {
            reject(error);
        });
    });
}