app.controller('HomeController', ['$scope', function($scope) {

}])

app.controller('CreateController', ['$scope', '$location','$http','$cookies', function($scope, $location, $http, $cookies) {
  $scope.optionLimit = 2;
   $scope.options = [{for: 'option_1', label: 'Option 1', id:'option_1'},
                    {for: 'option_2', label: 'Option 2', id:'option_2'},
                    {for: 'option_3', label: 'Option 3', id:'option_3'},
                    {for: 'option_4', label: 'Option 4', id:'option_4'},
                    {for: 'option_5', label: 'Option 5', id:'option_5'}];
  $scope.newVote = function() {
    //$http.post()
    var id = 1

    $cookies.put('mod', id)
    $location.path('/moderator/' + id);
  }
}])

app.controller('ModeratorController', ['$scope','$interval','$http','$cookies','$routeParams','$location', function($scope, $interval,$http,$cookies, $routeParams, $location){
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
  $scope.startVote = function(){
    checker = $interval(function(){
      $http.get().success(function(err,data){
        results = data
      })
    }, 3000)
    $scope.inProgress = true
  }
  $scope.endVote = function(){
    $http.get().success(function(err,data){
      results = data
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
    $location.path('/' + voteId + '/results')
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
      $location.path('/' + voteId + '/results')
   // })
    
  }

}])

app.controller('ResultsController', ['$scope', function($scope) {
  
}])