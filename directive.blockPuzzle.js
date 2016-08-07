app.directive('blockPuzzle', 
  ['$interval',
  function($interval){
      return {
        templateUrl: "/blockPuzzle.html",
        restrict: 'E',
        link:function(scope, element, attrs, ctrls){

  console.log ("hello!")
    var blocks = {
      I:  {
            0: [[false,true,false,false],
                [false,true,false,false],
                [false,true,false,false],
                [false,true,false,false]],
            1: [[false,false,false,false],
                [true,true,true,true],
                [false,false,false,false],
                [false,false,false,false]],
            2: [[false,false,true,false],
                [false,false,true,false],
                [false,false,true,false],
                [false,false,true,false]],
            3: [[false,false,false,false],
                [false,false,false,false],
                [true,true,true,true],
                [false,false,false,false]],
          },
      T:  {
            0: [[false,true,false,false],
                [true,true,true,false],
                [false,false,false,false],
                [false,false,false,false]],
            1: [[false,true,false,false],
                [false,true,true,false],
                [false,true,false,false],
                [false,false,false,false]],
            2: [[false,false,false,false],
                [true,true,true,false],
                [false,true,false,false],
                [false,false,false,false]],
            3: [[false,true,false,false],
                [true,true,false,false],
                [false,true,false,false],
                [false,false,false,false]],
          },
      O:  {
            0: [[false,true,true,false],
                [false,true,true,false],
                [false,false,false,false],
                [false,false,false,false]],
            1: [[false,true,true,false],
                [false,true,true,false],
                [false,false,false,false],
                [false,false,false,false]],
            2: [[false,true,true,false],
                [false,true,true,false],
                [false,false,false,false],
                [false,false,false,false]],
            3: [[false,true,true,false],
                [false,true,true,false],
                [false,false,false,false],
                [false,false,false,false]],
          },
      Z1: {
            0: [[true,false,false,false],
                [true,true,false,false],
                [false,true,false,false],
                [false,false,false,false]],
            1: [[false,true,true,false],
                [true,true,false,false],
                [false,false,false,false],
                [false,false,false,false]],
            2: [[true,false,false,false],
                [true,true,false,false],
                [false,true,false,false],
                [false,false,false,false]],
            3: [[false,true,true,false],
                [true,true,false,false],
                [false,false,false,false],
                [false,false,false,false]],
          },
      Z2: {
            0: [[false,true,false,false],
                [true,true,false,false],
                [true,false,false,false],
                [false,false,false,false]],
            1: [[true,true,false,false],
                [false,true,true,false],
                [false,false,false,false],
                [false,false,false,false]],
            2: [[false,true,false,false],
                [true,true,false,false],
                [true,false,false,false],
                [false,false,false,false]],
            3: [[true,true,false,false],
                [false,true,true,false],
                [false,false,false,false],
                [false,false,false,false]],
          },
      L1: {
            0: [[false,false,true,false],
                [false,false,true,false],
                [false,true,true,false],
                [false,false,false,false]],
            1: [[true,false,false,false],
                [true,true,true,false],
                [false,false,false,false],
                [false,false,false,false]],
            2: [[true,true,false,false],
                [true,false,false,false],
                [true,false,false,false],
                [false,false,false,false]],
            3: [[true,true,true,false],
                [false,false,true,false],
                [false,false,false,false],
                [false,false,false,false]]
          },
      L2: {
            0: [[true,false,false,false],
                [true,false,false,false],
                [true,true,false,false],
                [false,false,false,false]],
            1: [[true,true,true,false],
                [true,false,false,false],
                [false,false,false,false],
                [false,false,false,false]],
            2: [[false,true,true,false],
                [false,false,true,false],
                [false,false,true,false],
                [false,false,false,false]],
            3: [[false,false,true,false],
                [true,true,true,false],
                [false,false,false,false],
                [false,false,false,false]],
          },
    }
  
    function getBlockTypeColor (blockType){
      switch(blockType){
        case "I":
          return "aqua";
        case "T": 
          return "purple";
        case "O":
          return "yellow";
        case "Z1": 
          return "green";
        case "Z2":
          return "red";
        case "L1":
          return "orange";
        case "L2":
          return "blue";
        default:
          return "grey";
      }
    }
    var newBlock = function(){
      blockTypes = Object.keys(blocks);
      nextNewBlockSettings = {
        orient: 0,
        parentCell:{
          x: 5,
          y: 0
        }
      }
      while (scope.game.nextNewBlocks.length < 6){
        randomBlockType = blockTypes[Math.floor(Math.random()*blockTypes.length)];
        scope.game.nextNewBlocks.push({
          type: randomBlockType,
          grid: angular.copy(blocks[randomBlockType][nextNewBlockSettings.orient]),
          color: getBlockTypeColor (randomBlockType)
        })
      }
      newBlockShape = scope.game.nextNewBlocks.shift()
      scope.currentBlock = angular.extend(nextNewBlockSettings,newBlockShape);
      updatePredictedBlock();
    }
    scope.saveBlock = function(){
      if (!scope.game["savedBlock"]["isNew"]){
        $interval.cancel(scope.gameLoop);
        if (angular.isUndefined(scope.game["savedBlock"]["type"])){
          scope.game.savedBlock = {
            color: angular.copy(scope.currentBlock["color"]),
            type: angular.copy(scope.currentBlock['type']),
            grid: angular.copy(scope.currentBlock['grid'])
          }
          newBlock();
        } else {
          var tempBlock = angular.copy(scope.game["savedBlock"]);
          scope.game.savedBlock = {
            color: angular.copy(scope.currentBlock["color"]),
            type: angular.copy(scope.currentBlock['type']),
            grid: angular.copy(scope.currentBlock['grid'])
          }
          scope.currentBlock['type'] = tempBlock["type"];
          scope.currentBlock['grid'] = tempBlock["grid"];
          scope.currentBlock['color'] = tempBlock["color"];
        }
        scope.game["savedBlock"]["isNew"] = true;
        scope.gameLoop =  $interval(scope.incrementBlock, 1000 - (scope.game.level*50));
      }
      updatePredictedBlock();
    }

    var initGame = function(){
      scope.game={
        isPaused: false,
        score: 0,
        level: 1,
        savedBlock: {
          grid: [[false,false,false,false],
                 [false,false,false,false],
                 [false,false,false,false],
                 [false,false,false,false],],
          type: undefined,
          isNew: false
        },
        nextNewBlocks: []
      };
      scope.game.board = new Array(20);
      for (var i = 0; i < 20; i++) {
        scope.game.board[i] = new Array(10);
        for (var j = 0; j < 10; j++) {
          scope.game.board[i][j] = false;
        }
      };
      newBlock();
    }

    initGame();


    scope.getCellColor = function(xCoord,yCoord){
      if (scope.game.board[yCoord][xCoord]){
        return {'background-color': scope.game.board[yCoord][xCoord]};
      }
      if (scope.currentBlock.parentCell.y <= yCoord && scope.currentBlock.parentCell.y+3 >= yCoord){
        var affectedRow = scope.currentBlock.grid[yCoord-scope.currentBlock.parentCell.y];
        if (scope.currentBlock.parentCell.x <= xCoord && scope.currentBlock.parentCell.x+3 >= xCoord){
          if (affectedRow[xCoord-scope.currentBlock.parentCell.x]){
            return {'background-color': scope.currentBlock.color};
          }
        }
      }
      if (scope.predictedBlock.parentCell.y <= yCoord && scope.predictedBlock.parentCell.y+3 >= yCoord){
        var affectedRow = scope.predictedBlock.grid[yCoord-scope.predictedBlock.parentCell.y];
        if (scope.predictedBlock.parentCell.x <= xCoord && scope.predictedBlock.parentCell.x+3 >= xCoord){
          if (affectedRow[xCoord-scope.predictedBlock.parentCell.x]){
            return {'background-color': "black"};
          }
        }
      }
      return {'background-color': "grey"}
    }
    scope.startGame = function(){
      if(angular.isDefined(scope.gameLoop)){
        return; 
      }
      initGame();
      scope.gameLoop =  $interval(scope.incrementBlock, 1000/scope.game.level);
    }
    scope.pauseGame = function(){
      if(!scope.game.isPaused){
        scope.game.isPaused = true;
        $interval.cancel(scope.gameLoop);
      }else{
        scope.game.isPaused = false;
        scope.gameLoop =  $interval(scope.incrementBlock,  1000/scope.game.level);
      }
    }

    scope.increaseLevel = function(){
      scope.game.level++;
      $interval.cancel(scope.gameLoop);
      scope.gameLoop =  $interval(scope.incrementBlock, 1000/scope.game.level);
    }

    scope.decreaseLevel = function(){
      scope.game.level--;
      $interval.cancel(scope.gameLoop); 
      scope.gameLoop =  $interval(scope.incrementBlock,  1000/scope.game.level);
    }

    scope.moveBlock = function(direction){
      if (direction == "left" && nextBlockValid('left')){
        scope.currentBlock.parentCell.x--;
      }else if (direction =="right" && nextBlockValid('right')){
        scope.currentBlock.parentCell.x++;
      }
      updatePredictedBlock();
    }
    scope.isCellFull=function(xCoord, yCoord){
      if (scope.game.board[yCoord][xCoord]){
        return true;
      }
      if (scope.currentBlock.parentCell.y <= yCoord && scope.currentBlock.parentCell.y+3 >= yCoord){
        var affectedRow = scope.currentBlock.grid[yCoord-scope.currentBlock.parentCell.y];
        if (scope.currentBlock.parentCell.x <= xCoord && scope.currentBlock.parentCell.x+3 >= xCoord){
          return affectedRow[xCoord-scope.currentBlock.parentCell.x];
        }
      }
      return false;
    };

    scope.clearRow = function(yIndex){
      scope.game.board.splice(yIndex, 1);
      scope.game.board.unshift(makeEmptyRow());
    }


    scope.rotateBlock = function(){
      if (scope.currentBlock.orient < 3){
        var orient= scope.currentBlock.orient+1;
      }else{
        var orient= 0;
      }
      var nextBlock = blocks[scope.currentBlock.type][orient]
      if (nextBlockValid('rotate',getBlockCoords(nextBlock, scope.currentBlock.parentCell))) {
        scope.currentBlock.orient = orient;
        scope.currentBlock.grid = nextBlock;
      } 
      updatePredictedBlock();
    }

    function getBlockCoords(block, parentCell){
     var blockCoords = [];
      block.forEach(function(row,yCoord){
        row.forEach(function(cell,xCoord){
          if(cell){
            blockCoords.push({
              x: parentCell.x + xCoord,
              y: parentCell.y + yCoord});
          }
        });
      });     
      return blockCoords;
    }

    function updatePredictedBlock(){
      scope.predictedBlock = angular.copy(scope.currentBlock);
       var parentCell = angular.copy(scope.predictedBlock.parentCell);
      while ( nextBlockValid("down", getBlockCoords(scope.predictedBlock.grid, parentCell))){
        parentCell.y = parentCell.y + 1;
      }
      scope.predictedBlock.parentCell.y =  parentCell.y ;
    }


    function nextBlockValid(direction, blockCoords){
      if (!blockCoords){
        var blockCoords = getBlockCoords(scope.currentBlock.grid, scope.currentBlock.parentCell);
      }
      if(direction == "down"){
        return _.every(blockCoords,function(blockCoord){
          return (blockCoord.y != 19 && !scope.game.board[blockCoord.y + 1][blockCoord.x]) 
        });
      }else if (direction == "left"){
         return _.every(blockCoords,function(blockCoord){
          return (blockCoord.x != 0 && !scope.game.board[blockCoord.y][blockCoord.x - 1])
        });       
      }else if (direction == "right"){//direction =="right"
         return _.every(blockCoords,function(blockCoord){
          return (blockCoord.x != 9 && !scope.game.board[blockCoord.y][blockCoord.x + 1])
        });         
      }else { //from rotate, !!! bad functioning: blockCoord is NEXT block here instead of CURRENTBLOCK AS IN THE OTHER CASES
        return _.every(blockCoords,function(blockCoord){
          return (blockCoord.x != -1 && 
                  blockCoord.x != 10 && 
                  blockCoord.y != 20 && 
                  !scope.game.board[blockCoord.y][blockCoord.x]) 
        });
      }  
    }

    function makeEmptyRow(){
      return [false,false,false,false,false,false,false,false,false,false];
    };

    scope.dropBlock = function(){
      scope.game.isBlockDropping = true;
      while(nextBlockValid("down")){
        setTimeout(scope.incrementBlock(), 100);
      }
    };
    scope.incrementBlock = function(){
      if (nextBlockValid("down")){
        scope.currentBlock.parentCell.y++;
      }else{
        // var blockLandedSound =  new Audio("http://www.freesfx.co.uk/rx2/mp3s/6/17939_1464203358.mp3");
        // blockLandedSound.play()
        scope.currentBlock.grid.forEach(function(row,yCoord){
          row.forEach(function(cell,xCoord){
            if(cell){
              scope.game.board[scope.currentBlock.parentCell.y + yCoord][ scope.currentBlock.parentCell.x + xCoord] = scope.currentBlock.color;
            }
          });
        });
        if(scope.currentBlock.parentCell.y < 1){
          $interval.cancel(scope.gameLoop);
          scope.gameLoop = undefined;
          scope.isPuzzleRunning = false;
        }else{
          var newPoints = 0
          scope.game.board.forEach(function(row, yIndex){
            if (_.every(row, function(cell){return cell;})){
              var blockClearSound = new Audio("http://www.freesfx.co.uk/rx2/mp3s/6/18625_1464805220.mp3");
              // blockClearSound.play()
              $interval.cancel(scope.gameLoop);
              setTimeout(scope.clearRow(yIndex),1000);
              scope.gameLoop =  $interval(scope.incrementBlock,  1000/scope.game.level);      
              newPoints += 10; 
            }
          });
          if (((scope.game.score % 100) + newPoints) >= 100 ){
            scope.increaseLevel();
          }
          scope.game.score += newPoints;
          newBlock();
        }
        scope.game["savedBlock"]["isNew"] = false;
        scope.game.isBlockDropping = false;
      }
    };

    scope.$on("keyPress",function(event, args){
      console.log(args.key);
      //allow game start with space if not started
      // blockLandedSound.load()
      
      if (args.key === "Space" && angular.isUndefined(scope.gameLoop)){
        scope.startGame();
        return;
      }
      if( scope.game.isBlockDropping || angular.isUndefined(scope.gameLoop)){
        return;
      }
      // var code = e.keyCode ? e.keyCode : e.which;
      if (args.key === "ArrowLeft") { //up key
        scope.moveBlock('left')
      } else if (args.key === "ArrowUp") { //up key
        scope.rotateBlock()
      } else if (args.key === "ArrowRight") { //right key
        scope.moveBlock('right')
      } else if (args.key === "ArrowDown") { //down key
        scope.incrementBlock()
      } else if (args.key ==="KeyC"){
        scope.saveBlock();
      } else if (args.key === "Space"){
        scope.dropBlock();
      } else if (args.key === "KeyP"){
        scope.pauseGame();
      }
    });
  }}}])