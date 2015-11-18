var db = require('praise.js')

module.exports = function(id){
  return Promise.all([
    db.selectById('polls', id),
    db.countVotes(id),
    db.getVoters(id)
  ]).then(function(results){
    var currentData = {
      results: results[1],
      publicVotes: results[2]
    }
    currentData.topic = results[0].topic;
    currentData.creator = results[0].creator;
    currentData.id = id;
    currentData.is_active = results[0].is_active;
    return currentData;
  })
}