app.controller('BlockRPG', ['$scope', '$interval', function($scope, $interval) {

  $scope.keyPress = function (event) {
    //allow game start with space if not started
    // blockLandedSound.load()
    // var code = e.keyCode ? e.keyCode : e.which;

    $scope.$broadcast('keyPress', {key: event.code, isPuzzleRunning: $scope.isPuzzleRunning});
  };

}]);
