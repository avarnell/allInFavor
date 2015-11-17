app.controller('HomeController', ['$scope', function($scope) {

}])

app.controller('CreateController', ['$scope', '$location','$http','$cookies', '$rootScope', function($scope, $location, $http, $cookies, $rootScope) {
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

app.controller('ModeratorController', ['$scope', function($scope){
  $scope.startVote = function(){
    $scope.inProgress = true
  }

  $scope.endVote = function(){
    $scope.inProgress = false
  }

  $scope.inProgress = false
  //dummy data
  $scope.labels = ["james", "peter", "john"];
  $scope.data = [30, 50, 10]
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