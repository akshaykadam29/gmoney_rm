'use strict';
const router = require('express').Router();
const Designation = require('../models/addDesignation.server.model');
const config = require('../config/jwtHelper');

router.post('/designation/createDesignation',config.verifyToken, async (req,res) => {
    const adddesig = new Designation({
        designation : req.body.role,
        roleAccess : req.body.roleAccess,
        sort : req.body.sort
    });
    adddesig.save().then(doc => {
        res.send(doc);
    })
    .catch(err=>{
        res.json(err);
    });
});

module.exports = router;

