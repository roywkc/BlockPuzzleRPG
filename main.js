var app = angular.module('myApp', [])
.run(function($rootScope) {
  $rootScope.boardType = null;
  $rootScope.isPuzzleRunning = false;
});
