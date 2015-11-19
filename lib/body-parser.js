module.exports = {
  newPoll: function(body){
    return {
      topic: body.topic,
      creator: body.creator,
      anonymous: body.anonymous,
      access_code: body.access_code
    }
  },

  newOptions: function(id, body){
    return {
      poll_id: id, 
      option_1: body.option_1,
      option_2: body.option_2,
      option_3: body.option_3,
      option_4: body.option_4,
      option_5: body.option_5
    }
  },

  vote: function(id, body){
    return {
      poll_id: id,
      name: body.name,
      vote: body.vote
    }
  }
}