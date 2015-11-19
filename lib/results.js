var db = require('praise.js')

module.exports = function(id){
  return Promise.all([
    db.selectById('polls', id),
    db.countVotes(id),
    db.getVoters(id)
  ]).then(function(results){
    return {  
      id : id,
      topic : results[0].topic,
      creator : results[0].creator,
      is_active : results[0].is_active,
      vote_ended: results[0].vote_ended,
      access_code: results[0].access_code,
      results: results[1],
      publicVotes: results[2]
    }
  })
}