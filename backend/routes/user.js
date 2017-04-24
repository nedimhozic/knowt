var express = require('express');
var router = express.Router();

var UserBO = require('../businessObject/userBo');

//Post User
router.post('/register', function (req, res) {
    let reqUser = req.body;

    UserBO.register(reqUser).then((response) => {
        res.status(response.status);
        res.json(response.data);
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

//Login
router.post('/login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let token = req.body.token;

    UserBO.login(username, password, token).then((response) => {
        res.status(response.status);
        res.json(response.data);
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

//Request for new password
router.post('/forgot', function (req, res) {
    let email = req.body.email;

    UserBO.forgotPassword(email).then((response) => {
        res.status(response.status);
        res.json({ message: response.data });
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

//Update password
router.put('/changePassword', function (req, res) {
    let password = req.body.password;
    let token = req.body.token;

    UserBO.updatePassword(password, token).then((response) => {
        res.status(response.status);
        res.json({ message: response.data });
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

module.exports = router;