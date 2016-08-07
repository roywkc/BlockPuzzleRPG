app.directive('blockRpg', 
  ['$interval',
  function($interval){
      return {
        templateUrl: "/blockRPG.html",
        restrict: 'E',
        link:function(scope, element, attrs, ctrls){

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
            console.log(gameBoard);
            return gameBoard;
          }

          scope.game = {
            hero: {
              pos: {x:5, y:5},
              avatarImg: "hero",
              blocks:[]
            },
            board: newGameBoard()
          }

          scope.$on("keyPress",function(event, args){
            if (args.isPuzzleRunning){
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
          }
        }}}])