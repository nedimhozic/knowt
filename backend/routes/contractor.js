var express = require('express');
var router = express.Router();

var ContractorBO = require('../businessObject/contractorBo');

//Get All Contractors
router.get('/all', function (req, res) {
    let token = req.headers.token;
    let userId = req.query.userId;

    ContractorBO.getContractors(token, userId).then((response) => {
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

//Get Single Contractor
router.get('/:id', function (req, res) {
    let token = req.headers.token;
    let id = req.params.id;

    ContractorBO.getContractorById(token, id).then((response) => {
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

//Post Contractor
router.post('', function (req, res) {
    let token = req.headers.token;
    let contractor = req.body;

    ContractorBO.createContractor(token, contractor).then((response) => {
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

//Delete Contractor
router.delete('/:id', function (req, res) {
    let token = req.headers.token;
    let id = req.params.id;

    ContractorBO.deleteContractor(token, id).then((response) => {
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

//Update Contractor
router.put('/', function (req, res) {
    let contractor = req.body;
    let token = req.headers.token;

    ContractorBO.updateContractor(token, contractor).then((response) => {
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