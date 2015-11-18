var express = require('express');
var router = express.Router();
var db = require('praise.js')
var parse = require('../lib/body-parser')
var getResults = require('../lib/results')

router.post('/new-poll', function(req ,res){
  console.log(parse.newPoll(req.body))
  db.insert('polls', parse.newPoll(req.body)).then(function(poll){
    var newOptions = parse.newOptions(poll.id, req.body);
    db.insert('options', newOptions)
    res.json(newOptions).sendStatus(200).end()
  })
})

router.get('/poll/:id/results', function(req, res){
  getResults(req.params.id).then(function(currentData){
    res.json(currentData).sendStatus(200).end()  
  })
})

router.get('/poll/:id/:access_code*?', function(req, res){
  if (req.params.access_code){
    db.selectById('polls', req.params.id).then(function(poll){
      if (!(req.params.access_code == poll.access_code)){
        res.sendStatus(401).end()
      }
    })
  }
  db.join({polls: req.params.id}, {options: 'poll_id'}, req.params.id).then(function(results){
    res.json(results).status(200).end()
  })
})

router.post('/:id/vote', function(req, res){
  db.insert('votes', parse.vote(req.params.id, req.body)).then(function(_){
    res.sendStatus(200).end()
  })
})

router.get('*', function(req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/../public'
  })
});

module.exports = router;