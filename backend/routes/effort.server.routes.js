const router = require('express').Router();
const leadModel = require('../models/leads.server.model');

    router.get('/effort/getRmLeadsEffortById/:rmId', (req,res)=>{
        var filter = { 
            lead_assigned_to : req.params.rmId,
            $and : [ 
                {status : {$ne : "social"}},
                {status : {$ne : null}}
            ]
        }
        leadModel.find(filter).exec().then(data => {
            res.send({
                results : data
            })
        });
    });

    

module.exports = router;