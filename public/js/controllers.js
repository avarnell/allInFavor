app.controller('HomeController', ['$scope', function($scope) {

}])

app.controller('CreateController', ['$scope', '$location','$http','$cookies', '$rootScope', function($scope, $location, $http, $cookies, $rootScope) {
  $scope.optionLimit = 2;
   $scope.options = [{for: 'option_1', label: 'Option 1', id:'option_1'},
                    {for: 'option_2', label: 'Option 2', id:'option_2'},
                    {for: 'option_3', label: 'Option 3', id:'option_3'},
                    {for: 'option_4', label: 'Option 4', id:'option_4'},
                    {for: 'option_5', label: 'Option 5', id:'option_5'}];
  $scope.newVote = function() {
    console.log($scope.vote)
    $http.post('/new-poll', {
      topic: $scope.vote.topic,
      creator: $scope.vote.creator,
      access_code: $scope.vote.code,
      anonymous: $scope.vote.anonymous,
      option_1: $scope.vote.option_1,
      option_2: $scope.vote.option_2,
      option_3: $scope.vote.option_3,
      option_4: $scope.vote.option_4,
      option_5: $scope.vote.option_5
    }).then(function(result){
      console.log(result.data.poll_id)
      $rootScope.poll_id = result.data.poll_id
    })
    var id = 1

    $cookies.put('mod', id)
    $location.path('/moderator/' + id);
  }
}])


app.controller('ModeratorController', ['$scope','$interval','$http','$cookies','$routeParams','$location', '$rootScope', function($scope, $interval,$http,$cookies, $routeParams, $location, $rootScope){
  if($cookies.get('mod') !== $routeParams.id){
    $location.path('/vote/' + $routeParams.id)
  }

  $scope.labels = []
  $scope.data = []

  //sample results
  var results = {
    id : 1,
    topic: 'Should we deport Obama',
    creator : 'Donald Trump',
    results : [
      {optionName : 'Yes',
      optionVotes : 2},
      {optionName : 'Absolutely',
      optionVotes : 1}
    ],
    publicVotes : [
      {personName : 'Bobby Tables',
      personVote: 'Absolutely'},
      {personName : 'James Tables',
      personVote: 'Yes'},
      {personName : 'Peter Tables',
      personVote: 'Yes'},
    ]
  }
  results.results.forEach(function(result){
    $scope.labels.push(result.optionName)
    $scope.data.push(result.optionVotes)
  })
  $scope.question = results.topic
  $scope.creator = results.creator
  $scope.userVotes = results.publicVotes
  var checker = ''

  $scope.startVote = function(id){
    checker = $interval(function(){
      console.log('ran once')
      $http.get('/poll/' + $rootScope.poll_id + '/results').then(function(data){
        console.log(data)
      })
    }, 3000)

    $scope.inProgress = true
  }
  $scope.endVote = function(){
    $http.get().success(function(err, data){
      console.log(data)
    })
    $interval.cancel(checker)
    $scope.inProgress = false
  }

  $scope.inProgress = false
  //dummy data
}])

app.controller('JoinController', ['$scope', '$location', function($scope, $location) {
  $scope.joinVote = function() {
    var id = 1;
    $location.path('/vote/' + id);
  }
}])

app.controller('VoteController', ['$scope','$cookies', '$location', function($scope, $cookies, $location) {
  //temp voteId
  var voteId = 1
  if($cookies.get(voteId)){
    $location.path('/vote/' + voteId + '/results')
  }

  $scope.question = 'Should we have beer at work?';
  $scope.options = [{topic: "Option 1", id: 'option_1'},{topic: "Option 2", id: 'option_2'},{topic: "Option 3", id: 'option_3'}];

  $scope.selectedIndex;

  $scope.optionClicked = function ($index) {
    $scope.selectedIndex = $index;
  };

  $scope.submitVote = function(){
    $cookies.put(voteId, 'voted')
    var toSub = 'option_' + ($scope.selectedIndex + 1)
    //http(/).success(function(err,data){
      $location.path('/vote/' + voteId + '/results')
   // })
    
  }

}])

app.controller('ResultsController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
  var results = {
    isActive : false,
    id : 1,
    topic: 'Should we deport Obama',
    creator : 'Donald Trump',
    results : [
      {optionName : 'Yes',
      optionVotes : 2},
      {optionName : 'Absolutely',
      optionVotes : 1}
    ],
    publicVotes : [
      {personName : 'Bobby Tables',
      personVote: 'Absolutely'},
      {personName : 'James Tables',
      personVote: 'Yes'},
      {personName : 'Peter Tables',
      personVote: 'Yes'},
      {personName : 'Peter Tables',
      personVote: 'Yes'},
      {personName : 'Peter Tables',
      personVote: 'Yes'},
      {personName : 'Peter Tables',
      personVote: 'Yes'},
      {personName : 'Peter Tables',
      personVote: 'Yes'},
      {personName : 'Peter Tables',
      personVote: 'Yes'},
      {personName : 'Peter Tables',
      personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
      {personName : 'Peter Tables', personVote: 'Yes'},
    ]
  }

  if(results.isActive == true){
    var getVotes = $interval(function(){
      $http.get().success(function(err,data){
        results = data
      })
    }, 1000)
  }

  $scope.labels = []
  $scope.data = []
  //sample Results
  
  results.results.forEach(function(result){
    $scope.labels.push(result.optionName)
    $scope.data.push(result.optionVotes)
  })
  $scope.question = results.topic
  $scope.creator = results.creator
  $scope.userVotes = results.publicVotes

}])



