var express = require('express');
var router = express.Router();
var db = require('praise.js')

/* GET home page. */

router.post('/new-poll', function(req ,res){
  db.insert('polls', {
    topic: req.body.topic,
    creator: req.body.creator,
  }).then(function(poll){
    console.log(poll)
    db.insert('options', {
      poll_id: poll.id, 
      option_1: req.body.option_1,
      option_2: req.body.option_2,
      option_3: req.body.option_3,
      option_4: req.body.option_4,
      option_5: req.body.option_5
    })
    res.send({
      poll_id: poll.id, 
      option_1: req.body.option_1,
      option_2: req.body.option_2,
      option_3: req.body.option_3,
      option_4: req.body.option_4,
      option_5: req.body.option_5
    }).status(200).end()
  })
})

router.post('/vote/:poll_id', function(req, res){
  db.insert('votes', {
    poll_id: req.params.poll_id, 
    vote: req.body.vote
  }).then(function(_){
    res.render('dashboard', {poll_id: req.body.poll_id})
  })
})

router.get('*', function(req, res, next) {
  res.render('index');
});

module.exports = router;
