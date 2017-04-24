var mongoose = require('mongoose');
var fs = require('fs');

var db = mongoose.connection;

var ContractorSchema = mongoose.Schema({
    name: {
        type: String
    },
    imagePath: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

var Contractor = module.exports = mongoose.model('Contractor', ContractorSchema);
var User = require('./user');

module.exports.getAllContractors = function (userId, callback) {
    Contractor.find({ "userId": userId }, callback);
}

module.exports.getById = function (id, callback) {
    Contractor.findById(id, callback);
}

module.exports.createContractor = function (newContractor, callback) {
    newContractor.save((err, contractor) => {
        if (err) {
            callback(err);
            return;
        }
        User.addContractorToUser(newContractor.userId, contractor._id, (err) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, contractor);
        });
    });
}

module.exports.deleteContractor = function (id, callback) {
    Contractor.findByIdAndRemove(id, (err, contractor) => {
        if (err) {
            callback(err);
            return;
        }
        User.removeContractorFromUser(contractor.userId, contractor._id, (err) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, contractor);
        });
    });
}

module.exports.updateContractor = function (contractor, callback) {
    var query = { _id: contractor._id };
    Contractor.findOneAndUpdate(query, contractor, { new: true }, callback);
}


module.exports.addTaskToContractor = function (contractorId, taskId, callback) {
    Contractor.findOneAndUpdate({ _id: contractorId }, { $push: { tasks: taskId } }, (err, data) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
}

module.exports.removeTaskFromContractor = function (contractorId, taskId, taskId) {
    Contractor.findOneAndUpdate({ _id: contractorId }, { $pull: { tasks: contractorId } }, function (err, data) {
        if (err) {
            callback(err);
        }
        callback(null);
    });
}

module.exports.saveImage = function (contractorId, base64, callback) {

    var base64Data = base64.replace("data:image/jpeg;base64,", "");
    base64Data += base64Data.replace('+', ' ');
    var binaryData = new Buffer(base64Data, 'base64').toString('binary');

    fs.writeFile(__dirname + "/../images/contractor_" + contractorId + ".jpg", binaryData, "binary", function (err) {

    });
}

