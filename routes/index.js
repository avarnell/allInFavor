var express = require('express');
var router = express.Router();
var db = require('praise.js')
var parse = require('../lib/body-parser')
var getResults = require('../lib/results')

router.post('/new-poll', function(req ,res){
  db.insert('polls', parse.newPoll(req.body)).then(function(poll){
    var newOptions = parse.newOptions(poll.id, req.body);
    db.insert('options', newOptions)
    res.json(newOptions).status(200).end()
  })
})

router.get('/poll/:id/results', function(req, res){
  getResults(req.params.id).then(function(currentData){
    res.json(currentData).status(200).end() 
  })
})

router.get('/poll/:id/:access_code*?', function(req, res){
  db.selectById('polls', req.params.id).then(function(poll){
    if (poll.access_code){
      if (!(req.params.access_code === poll.access_code)){
        res.sendStatus(401).end()
      }
    }
  })
  db.join('polls', 'options', req.params.id).then(function(results){
    console.log(results)
    res.json(results).status(200).end()
  })
})

router.post('/:id/vote', function(req, res){
  db.insert('votes', parse.vote(req.params.id, req.body)).then(function(){
    res.status(200).end()
  })
})

router.put('/poll/start/:id', function(req, res){
  db.update('polls', {id: req.params.id}, {is_active: true})
  res.status(200).end()
})

router.put('/poll/end/:id', function(req, res){
  db.update('polls', {id: req.params.id}, {is_active: false})
  db.update('polls', {id: req.params.id}, {vote_ended: true})
  res.status(200).end()
})

router.get('/reset/:id', function(req, res){
  db.delete('votes', { poll_id: req.params.id }).then(function(){
    console.log('deleted')
  })
  res.status(200).end()
})

router.get('*', function(req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/../public'
  })
});

module.exports = router;