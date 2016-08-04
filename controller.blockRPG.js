app.controller('BlockRPG', ['$scope', '$interval', function($scope, $interval) {
  console.log("hello!")
var newGameBoard = function(){

  var gameBoard = []
  var treeImg = "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=980698"
  for (i=0; i<10; i++){
    if (i == 0 || i == 9){
      row = _.range(10).map(function () { return { boardImg: "tree"} })
    }else if (i % 3 == 0){
      row = _.range(10).map(
        function (xCoord) { 
          if(xCoord == 0|| xCoord == 9 || (xCoord%3==0) ){
            return { boardImg: "tree"} 
          } else {
            return { boardImg: "dirt"}
          }
        });
    }else{
      row = _.range(10).map(
        function (xCoord) { 
          if(xCoord == 0|| xCoord == 9){
            return { boardImg: "tree"} 
          } else {
            return { boardImg: "dirt"}
          }
        });
    }
    gameBoard = gameBoard.concat([row]);
  }
      console.log(gameBoard)

  return gameBoard;
}

$scope.game = {
  character: {
    pos: {x:5, y:5},
    avatarImg: "hero"
  },
  board: newGameBoard()
}


}]);
