app.controller('BlockRPG', ['$scope', '$interval','$rootScope', function($scope, $interval,$rootScope) {
  $scope.keyPress = function (event) {
    //allow game start with space if not started
    // blockLandedSound.load()
    // var code = e.keyCode ? e.keyCode : e.which;
    $scope.$broadcast('keyPress', {key: event.code});
  };
}]);
