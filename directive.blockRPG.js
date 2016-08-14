app.directive('blockRpg', 
  ['$interval',
   '$rootScope',
  function($interval,$rootScope){
      return {
        templateUrl: "/blockRPG.html",
        restrict: 'E',
        link:function(scope, element, attrs, ctrls){
          var newGameBoard = function(){
            var gameBoard = []
            var treeImg = "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=980698"

            var template = ["ttttGttttt",
                        "tddddddddt",
                        "tddddddddt",
                        "tddtddtddt",
                        "tdddPddddt",
                        "tddddddddt",
                        "tddtddtddt",
                        "tddddddddt",
                        "tddddddddt",
                        "tttttttttt"]

            template.forEach(function(templateRow){
              var row = templateRow.split('');
              row = _.map(row, function(cell){
                if (cell == "t"){
                  return { boardImg: "tree"} 
                } else if (cell == "G"){
                  if( $rootScope.puzzleState[$rootScope.currentRoom]){
                    return { boardImg: "gate"}
                  } else {
                    return { boardImg: "tree"} 
                  }
                } else if (cell == "P"){
                  if( $rootScope.puzzleState[$rootScope.currentRoom]){
                    return { boardImg: "clearedPuzzle"}
                  }else{
                    return { boardImg: "puzzle"}
                  }            
                }else {
                  return { boardImg: "dirt"}
                }
              });
              gameBoard = gameBoard.concat([row]);
             });
            return gameBoard;
          }

          var initGame = function(){
            scope.game = {
              hero: {
                pos: {x:5, y:8},
                avatarImg: "hero",
                blocks:[]
              },
              board: newGameBoard()
            }
            }
          initGame();
          scope.$on("keyPress",function(event, args){
            if ($rootScope.isPuzzleRunning){
              return;
            }
            if (args.key === "ArrowLeft") { //up key
              moveHero('left')
            } else if (args.key === "ArrowUp") { //up key
              moveHero('up')
            } else if (args.key === "ArrowRight") { //right key
              moveHero('right')
            } else if (args.key === "ArrowDown") { //down key
              moveHero('down')
            }
          });

          var isTree = function(x,y){
            return scope.game.board[y][x].boardImg != "tree"
          }

          var canHeroMove = function(xDiff, yDiff){
            return isTree(scope.game.hero.pos.x + xDiff, scope.game.hero.pos.y + yDiff);
          }

          var moveHero = function(direction){
            if (direction == "up" && canHeroMove(0 , -1)){
              scope.game.hero.pos.y = scope.game.hero.pos.y -1;
            } else if (direction == "left" &&  canHeroMove(-1 , 0)) { //up key
              scope.game.hero.pos.x = scope.game.hero.pos.x -1;
            } else if (direction == "right" && canHeroMove(1, 0)) { //right key
              scope.game.hero.pos.x = scope.game.hero.pos.x +1;
            } else if (direction == "down" && canHeroMove(0, 1)) { //down key
              scope.game.hero.pos.y = scope.game.hero.pos.y +1;
            }
            if (scope.game.hero.pos.x == 4 && scope.game.hero.pos.y == 4 ){
              scope.$emit("puzzleStart", {boardType: $rootScope.currentRoom});
            }
            if (scope.game.hero.pos.x == 4 && scope.game.hero.pos.y == 0 ){
              var rooms = ["gaping_hole","cascade","tetris"]
              var roomIndex = rooms.indexOf($rootScope.currentRoom);
              $rootScope.currentRoom = [rooms[roomIndex + 1]]
              initGame();
            }
          }
        }}}])