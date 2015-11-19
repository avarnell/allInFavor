var db = require('praise.js')

module.exports = function(id){
  return Promise.all([
    db.selectById('polls', id),
    db.countVotes(id),
    db.getVoters(id)
  ]).then(function(results){
    console.log(results)
    return {  
      id : id,
      topic : results[0].topic,
      creator : results[0].creator,
      is_active : results[0].is_active,
      results: results[1],
      publicVotes: results[2]
    }
  })
}