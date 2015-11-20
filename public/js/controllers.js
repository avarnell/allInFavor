app.controller('CreateController', ['$scope', '$location','$http','$cookies', function($scope, $location, $http, $cookies) {
  $scope.optionLimit = 2;
   $scope.options = [{for: 'option_1', label: 'Option 1', id:'option_1'},
                    {for: 'option_2', label: 'Option 2', id:'option_2'},
                    {for: 'option_3', label: 'Option 3', id:'option_3'},
                    {for: 'option_4', label: 'Option 4', id:'option_4'},
                    {for: 'option_5', label: 'Option 5', id:'option_5'}];
  $scope.newVote = function() {
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
      $cookies.put('mod', result.data.poll_id)
      $location.path('/moderator/' + result.data.poll_id);
    })
  }
}])

app.controller('ModeratorController', ['$scope','$interval','$http','$cookies','$routeParams','$location', function($scope, $interval,$http,$cookies, $routeParams, $location){
  $scope.reset = true;
  $scope.labels = []
  $scope.data = []
  $scope.voteId = $routeParams.id

  function checkForVotes(id){
    $http.get('/poll/' + id + '/results').then(function(result){
      var results = result.data;
      $scope.code = results.access_code;
      $scope.labels = []
      $scope.data = []
      results.results.forEach(function(result){
        $scope.labels.push(result.vote)
        $scope.data.push(result.count)
      })
      $scope.userVotes = results.publicVotes
      $scope.topic = results.topic
      $scope.creator = results.creator
      if(results.is_active == true){
        $scope.inProgress = true
      }
      if(results.vote_ended == true) {
        $scope.voteEnded = true;
      }
    })
  }

  if($cookies.get('mod') != $routeParams.id){
    $location.path('/vote/' + $routeParams.id)
  }

  checkForVotes($routeParams.id);
  
  var checker = ''
  $scope.inProgress = false;
  $scope.voteEnded = false;
  $scope.startVote = function(){
    $scope.inProgress = true;
    $scope.reset = false;
    $http.put('/poll/start/'+ $routeParams.id)
    checker = $interval(function(){
      checkForVotes($routeParams.id)
    }, 1000)
    
    $scope.$on('$destroy', function(){$interval.cancel(checker);});
  }

  $scope.endVote = function(){
    $http.put('/poll/end/'+ $routeParams.id)
    $scope.reset = true;
    $scope.voteEnded = true;
    checkForVotes($routeParams.id)
    $interval.cancel(checker)
    $scope.inProgress = false
  }

  $scope.createVote = function() {
    $location.path('/create')
  }
}])

app.controller('JoinController', ['$scope', '$location','$http', '$rootScope',function($scope, $location, $http, $rootScope) {
  $scope.joinVote = function() {
    $http.get('/poll/' + $scope.id + '/' + $scope.code).success(function(err,result){
      $rootScope.access = $scope.code
      $scope.code = ''
      $location.path('/vote/' + $scope.id)
    }).error(function(err, status){
      $scope.error = 'Incorrect access code'
    })  
  }
}])

app.controller('VoteController', ['$scope','$cookies', '$location', '$routeParams', '$http','$rootScope', function($scope, $cookies, $location, $routeParams, $http, $rootScope) {
  var voteId = $routeParams.id

  if($cookies.get(voteId)){
    $location.path('/vote/' + voteId + '/results')
  }
  $http.get('/poll/' + voteId + '/' + $rootScope.access).success(function(results){
    if(results.is_active == false){
      $rootScope.error = 'The vote has not yet started'
      $location.path('/join')
    }
    if(results.vote_ended == true){
      $location.path('/vote/' + voteId + '/results')
    }
    var options = []
    for(var i = 1; i < 6; i++){
      var currOpt = 'option_' + i
      if(results[currOpt]){
        options.push({choice: results[currOpt], id: currOpt})
      }
    }
    $scope.topic = results.topic
    $scope.options = options
    $scope.anonymous = results.anonymous
  }).error(function(err, status) {
    $location.path('/join')
  })

  $scope.selectedIndex;

  $scope.optionClicked = function ($index) {
    $scope.selectedIndex = $index;
  };

  $scope.submitVote = function(){
    $cookies.put(voteId, 'voted')
    $scope.choice = '';
    var toSub = 'option_' + ($scope.selectedIndex + 1)
    $scope.options.forEach(function(option) {
      if(option.id == toSub) {
        $scope.choice = option.choice;
      }
    })
    $http.post('/' + voteId + '/vote', {
      poll_id: voteId,
      name: $scope.name,
      vote: $scope.choice
    }).then(function(result){
      $location.path('/vote/' + voteId + '/results')
    })
  }
}])

app.controller('ResultsController', ['$scope', '$http', '$interval','$routeParams', function($scope, $http, $interval, $routeParams) {
  $scope.labels = []
  $scope.data = []
  var isActive;
  function checkForVotes(id){
    $http.get('/poll/' + id + '/results').then(function(result){
      var results = result.data;
      $scope.labels = []
      $scope.data = []
      results.results.forEach(function(result){
        $scope.labels.push(result.vote)
        $scope.data.push(result.count)
      })
      isActive = results.is_active
      $scope.userVotes = results.publicVotes
      $scope.topic = results.topic
      $scope.creator = results.creator
    })
  }

  var checker = $interval(function(){
    checkForVotes($routeParams.id)
    if(isActive == false){
      $interval.cancel(checker)
    }
  },1000)

  $scope.$on('$destroy', function(){$interval.cancel(checker);});

  checkForVotes($routeParams.id)
  
}])