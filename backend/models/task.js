var mongoose = require('mongoose');

var db = mongoose.connection;

var TaskSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    approved: {
        type: Boolean
    },
    contractorId: {
        type: mongoose.Schema.Types.ObjectId
    }
});

var Task = module.exports = mongoose.model('Task', TaskSchema);
var Contractor = require('./contractor');

module.exports.getAllTasks = function (userId, date, callback) {
    var fromDate = new Date(date + "T00:00:00.000Z");
    var toDate = new Date(fromDate.getTime() + 1000 * 60 * 60 * 24);
    Task.find({ "date": { "$gte": fromDate, "$lt": toDate }, "userId": userId }, callback);
}

module.exports.getById = function (id, callback) {
    Task.findById(id, callback);
}

module.exports.createTask = function (newTask, callback) {
    newTask.save((err, task) => {
        if (err) {
            callback(err);
            return;
        }
        Contractor.addTaskToContractor(task.contractorId, task._id, (err) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, task);
        });
    });
}

module.exports.deleteTask = function (id, callback) {
    Task.findByIdAndRemove(id, (err, task) => {
        if (err) {
            callback(err);
            return;
        }
        Contractor.removeTaskFromContractor(task.contractorId, task._id, (err) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, task);
        });
    });
}

module.exports.updateTask = function (task, callback) {
    var query = { _id: task._id };
    Task.findOneAndUpdate(query, task, { new: true }, callback);
}