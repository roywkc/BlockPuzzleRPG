var app = angular.module('myApp', [])
.run(function($rootScope) {
  $rootScope.isPuzzleRunning = false;
  $rootScope.currentRoom = "gaping_hole";
});
