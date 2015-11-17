var express = require('express');
var router = express.Router();
var db = require('praise.js')

/* GET home page. */

router.post('/new-poll', function(req ,res){
  db.insert('polls', {
    topic: req.body.topic,
    creator: req.body.creator,
  }).then(function(poll){
    db.insert('options', {
      poll_id: poll.id, 
      option_1: req.body.option_1,
      option_2: req.body.option_2,
      option_3: req.body.option_3,
      option_4: req.body.option_4,
      option_5: req.body.option_5
    })
    res.json({
      poll_id: poll.id, 
      option_1: req.body.option_1,
      option_2: req.body.option_2,
      option_3: req.body.option_3,
      option_4: req.body.option_4,
      option_5: req.body.option_5
    }).status(200).end()
  })
})

router.get('/poll/:id/results', function(req, res){
  Promise.all([
    db.countVotes(req.params.id),
    db.getVoters(req.params.id)
  ]).then(function(results){
    var currentData = {
      results: results[0],
      publicVotes: results[1]
    }
    currentData.id = req.params.id;
    currentData.topic = req.body.topic; 
    currentData.creator = req.body.creator;
    res.json(currentData).status(200).end()
  })
})

router.post('/:id/vote', function(req, res){
  db.insert('votes', {
    poll_id: req.params.id, 
    name: req.body.name,
    vote: req.body.vote
  }).then(function(_){
    res.status(200).end()
  })
})

module.exports = router;
