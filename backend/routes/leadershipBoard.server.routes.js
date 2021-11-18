const router = require('express').Router();
const RmUser = require('../models/addRm.sever.model');


router.get('/leader/getLeaderByNationalRanking', (req,res) => {

    var date = new Date();
    var month=date.getMonth()+1;
    var year = date.getFullYear()
    var statDate = year + "-" + month + "-" + '01';
       RmUser.aggregate([
        {
          '$match': {
            '$and' : [
              {
                'name' : {
                  $ne : "Abhishek Dhawan"
                }
              },
              {
                'name' : {
                  $ne : "GMoney Private Limited"
                }
              }
            ]
            } 
        },
            {
              '$lookup': {
                'from': 'hospitals', 
                'localField': '_id', 
                'foreignField': 'rm_claimed', 
                'as': 'hospList'
              }
            }, {
              '$project': {
                'name': 1, 
                'hospList': {
                  '$filter': {
                    'input': '$hospList', 
                    'as': 'hosplist', 
                    'cond': {
                      '$and': [
                        {
                          '$gte': [
                            '$$hosplist.created_on', new Date(statDate)
                          ]
                        }, {
                          '$lt': [
                            '$$hosplist.created_on', new Date(date)
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            }, 
            {
              '$project': {
                'name': 1, 
                'region': 1, 
                'hospSize': {
                  '$size': '$hospList'
                }
              }
            }, {
              '$sort': {
                'hospSize': -1,
                'name' : 1
              }
            }
    ]).then(data =>{
        res.send(data);
    })
});

router.get('/leader/getLeaderByRegionalRanking',(req,res) => {
  var date = new Date();
  var month=date.getMonth()+1;
  var year = date.getFullYear()
  var statDate = year + "-" + month + "-" + '01';
  RmUser.aggregate([
    {
      '$match': {
        'region': {
          '$ne': null
        },
        '$and' : [
          {
            'name' : {
              $ne : "Abhishek Dhawan"
            }
          },
          {
            'name' : {
              $ne : "GMoney Private Limited"
            }
          }
        ]
        } 
    }, {
      '$lookup': {
        'from': 'hospitals', 
        'localField': '_id', 
        'foreignField': 'rm_claimed', 
        'as': 'hospList'
      }
    }, 
        {
          '$project': {
            'name': 1, 
            'region': 1, 
            'hospList': {
              '$filter': {
                'input': '$hospList', 
                'as': 'hosplist', 
                'cond': {
                  '$and': [
                    {
                      '$gte': [
                        '$$hosplist.created_on', new Date(statDate)
                      ]
                    }, {
                      '$lt': [
                        '$$hosplist.created_on', new Date(date)
                      ]
                    }
                  ]
                }
              }
            }
          }
        }, 
        {
          '$project': {
            'name': 1, 
            'region': 1, 
            'hospList': 1, 
            'count': {
              '$size': '$hospList'
            }
          }
        }, {
          '$sort': {
            'count': -1,
            'name' : 1
          }
        }, {
          '$group': {
            '_id': '$region', 
            'userHospList': {
              '$push': {
                'name': '$name', 
                'count': {
                  '$size': '$hospList'
                }
              }
            }
          }
        }, {
          '$sort': {
            '_id': -1
          }
        }
    ]).then(data =>{
      res.send(data);
  });
});


 
 

module.exports = router;