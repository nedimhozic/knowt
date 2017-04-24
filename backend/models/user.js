var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    verified: {
        type: Boolean
    },
    contractors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contractor'
    }]
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function (username, callback) {
    var query = { email: username };
    User.findOne(query, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getAll = function (callback) {
    User.find({}).exec().then((users) => {
        callback(null, users);
    }).catch((err) => {
        callback(err);
    });
}

module.exports.updateUser = function (user, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            var query = { _id: user._id };
            User.findOneAndUpdate(query, user, { new: true }, callback);
        });
    });
}

module.exports.addContractorToUser = function (userId, contractorId, callback) {
    User.findOneAndUpdate({ _id: userId }, { $push: { contractors: contractorId } }, (err, data) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
}

module.exports.removeContractorFromUser = function (userId, contractorId, callback) {
    User.findOneAndUpdate({ _id: userId }, { $pull: { contractors: contractorId } }, function (err, data) {
        if (err) {
            callback(err);
        }
        callback(null);
    });
}




