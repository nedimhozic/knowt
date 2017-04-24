var express = require('express');
var router = express.Router();

var TaskBO = require('../businessObject/taskBo');

//Get All Tasks
router.get('/all', function (req, res) {
    let token = req.headers.token;
    let userId = req.query.userId;
    let date = req.query.date;

    TaskBO.getTasks(token, userId, date).then((response) => {
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

//Get Single Task
router.get('/:id', function (req, res) {
    let token = req.headers.token;
    let id = req.params.id;

    TaskBO.getTaskById(token, id).then((response) => {
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

//Post Task
router.post('', function (req, res) {
    let token = req.headers.token;
    let task = req.body;

    TaskBO.createTask(token, task).then((response) => {
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

//Delete Task
router.delete('/:id', function (req, res) {
    let token = req.headers.token;
    let id = req.params.id;

    TaskBO.deleteTask(token, id).then((response) => {
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

//Update Task
router.put('/', function (req, res) {
    let task = req.body;
    let token = req.headers.token;

    TaskBO.updateTask(token, task).then((response) => {
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

module.exports = router;