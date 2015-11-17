app.controller('HomeController', ['$scope', function($scope) {

}])

app.controller('CreateController', ['$scope', function($scope) {
  $scope.optionLimit = 2;
   $scope.options = [{for: 'option1', label: 'Option 1', id:'option1', name: 'option1'},
                    {for: 'option2', label: 'Option 2', id:'option2', name: 'option2'},
                    {for: 'option3', label: 'Option 3', id:'option3', name: 'option3'},
                    {for: 'option4', label: 'Option 4', id:'option4', name: 'option4'},
                    {for: 'option5', label: 'Option 5', id:'option5', name: 'option5'}];

}])

app.controller('JoinController', ['$scope', function($scope) {
  
}])

app.controller('ResultsController', ['$scope', function($scope) {
  
}])