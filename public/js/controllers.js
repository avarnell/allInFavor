app.controller('HomeController', ['$scope', function($scope) {

}])

app.controller('CreateController', ['$scope', '$location','$http','$cookies', function($scope, $location, $http, $cookies) {
  $scope.optionLimit = 2;
   $scope.options = [{for: 'option1', label: 'Option 1', id:'option1'},
                    {for: 'option2', label: 'Option 2', id:'option2'},
                    {for: 'option3', label: 'Option 3', id:'option3'},
                    {for: 'option4', label: 'Option 4', id:'option4'},
                    {for: 'option5', label: 'Option 5', id:'option5'}];
  $scope.newVote = function() {
    //$http.post()
    var id = 1
    // $rootScope.vote = $scope.vote
    // $scope.vote = {}
    // //for testing pre api
    // $cookies.setCookie('mod', id)
    $location.path('/moderator/' + id);
  }
}])

app.controller('ModeratorController', ['$scope','$interval', function($scope, $interval){
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
      $http.get().success(err,data){
        var results = data
      }

    }, 3000)
    $scope.inProgress = true
  }

  $scope.endVote = function(){
    $http.get().success(err,data){
      var results = data
    }
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

app.controller('VoteController', ['$scope', function($scope) {
  $scope.question = 'Should we have beer at work?';
  $scope.options = ["Option 1", "Option 2", "Option 3"];

  $scope.selectedIndex;

  $scope.optionClicked = function ($index) {
    $scope.selectedIndex = $index;
  };
}])

app.controller('ResultsController', ['$scope', function($scope) {
  
}])