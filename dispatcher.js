const PF = require('pathfinding');
const aStarSearch = require('./algos/aStarSearch');
//const floodFill = require('./algos/floodFill');
const tailTrim = require('./algos/tailTrim');
const headAppend = require('./algos/headAppend');

exports.dispatcher = (game, turn, board, you) => {
    var generatedMove = 'up';
    var possibleMoves = ['up', 'down', 'left', 'right'];

    var grid = new PF.Grid(board.width, board.height);
    var finder = new PF.AStarFinder();
    
    var snake = you.body;
    var food = board.food;
    var ogBoard = board;

    //tail trimmed board
    var tailTrimGrid = tailTrim(board, you);
    var finalBoard = headAppend(tailTrimGrid, you);
    
    
    //need to add stuff
    modifyGrid(you, finalBoard, grid);


    //check if in corner
    var cornerMove = checkCorners(snake, ogBoard);
    if (cornerMove != null && checkMove(cornerMove, ogBoard, you)){
      console.log("used corner move");
      return cornerMove;
    }


    //Compute the path to both your tail and the closest piece of food on the board
    //If you are hungry and there exists a path to the closest piece of food, make the best move to get closer to the food.
    //40 is arbitrary we can change
    var closestFood = findClosestFood(food, snake[0], grid, finder);

    if (closestFood != null){
      var gridcp2 = grid.clone();
      var tempMoveFoodPath = finder.findPath(snake[0].x, snake[0].y, food[closestFood].x, food[closestFood].y, gridcp2);
      var tempMoveFood = null;
      if (tempMoveFoodPath.length >= 2){
        tempMoveFood = toPath(snake[0], tempMoveFoodPath[1][0], tempMoveFoodPath[1][1]);
      }
    
      if (you.health <= 100 && tempMoveFood != null && checkMove(tempMoveFood, ogBoard, you)){
        console.log("used Food move");
        return tempMoveFood;
      }
    }

    //If you are not hungry or there doesn’t currently exist a path to the food, check to see if there is a path to your tail
    //if there is, then make the best move to get closer to your tail.
    if (you.length > 3){
      var gridcp2 = grid.clone();
      var tempMoveTailPath = finder.findPath(snake[0].x, snake[0].y, snake[snake.length - 1].x, snake[snake.length - 1].y, gridcp2);
      console.log("tail path: " + tempMoveTailPath)
      var tempMoveTail = null;
      if (tempMoveTailPath.length >= 2){
        tempMoveTail = toPath(snake[0], tempMoveTailPath[1][0], tempMoveTailPath[1][1]);
      }
      if (tempMoveTail != null && checkMove(tempMoveTail, ogBoard, you)){
        console.log("used tail move");
        return tempMoveTail;
      }
    }
    


    //If there isn’t a path to your tail, make a move in the direction with the most “promise.”
    /*
    var tempMoveFlood = floodFill();
    if (tempMoveFlood != null && checkMove(tempMoveFlood, ogBoard, you)){
      return tempMoveFlood;
    }
    */

    //if we reach here what do we do?
    console.log("used panic move");
    return panicMove(ogBoard, board.height, board.width, you);
}

    
    
    
    
    
    
    



// custom code


function modifyGrid(you, board, grid){
    //need to add snakes, food, etc.
    for (var i = 0; i < board.snakes.length; i++){
        for (var j = 0; j < board.snakes[i].body.length; j++){
            grid.setWalkableAt(board.snakes[i].body[j].x, board.snakes[i].body[j].y, false);
        }
    }
    for (var i = 0; i < you.body.length; i++){
      grid.setWalkableAt(you.body[i].x, you.body[i].y, false);
    }
}

function findClosestFood(food, head, grid, finder){
    //find closest food from array
    var minDist = 1000;
    var minFood = 1000;

    for (var i = 0; i < food.length; i++){
        var gridcp = grid.clone();
        var tempPath = finder.findPath(head.x, head.y, food[i].x, food[i].y, gridcp);
        
        if (tempPath.length != 0 && tempPath.length < minDist){
          minDist = tempPath.length;
          minFood = i;
        }
    }

    if (minFood != 1000){
      return minFood;
    } else {
      return null;
    }
}


function toPath(head, x, y){
    if (head.x - x == 0){
        if (head.y - y == 1){
            return 'down';
        } else if (head.y - y == -1){
            return 'up';
        } else {
            console.log("tried to pass point that is not adjacent to snake");
        }
    } else if (head.x - x == -1){
        if (head.y - y == 0){
            return 'right';
        } else {
            console.log("tried to pass point that is not adjacent to snake");
        }
        
    } else if (head.x - x == 1){
        if (head.y - y == 0){
            return 'left';
        } else {
            console.log("tried to pass point that is not adjacent to snake");
        }
    } else {
        console.log("tried to pass point that not adjacent to snake");
    }
}
  
function checkMove(move, board, you){
    var x;
    var y;
    if (move == 'up'){
        x = you.body[0].x;
        y = you.body[0].y + 1;
    } else if (move == 'down'){
        x = you.body[0].x;
        y = you.body[0].y - 1;
    } else if (move == 'left'){
        x = you.body[0].x - 1;
        y = you.body[0].y;
    } else if (move == 'right'){
        x = you.body[0].x + 1;
        y = you.body[0].y;
    } else {
        console.log("error move passed");
        return false;
    }
    
    if (x < 0 || y < 0 || x >= board.height || y > board.width){
        console.log("moving off grid");
        return false;
    }
    /*
    if (finalBoard[x][y] == "1"){
        console.log("snake collision");
        return false;
    }
    */
    
    for (var i = 0; i < board.snakes.length; i++){
      for (var j = 0; j < board.snakes[i].body.length; j++){
          if (board.snakes[i].body[j].x == x && board.snakes[i].body[j].y == y){
              console.log("snake collision");
              return false;
          }
      }
    }
    
    return true;
}

function snakeCollision(board, you, x, y){
  for (var i = 0; i < board.snakes.length; i++){
      for (var j = 0; j < board.snakes[i].body.length; j++){
          if (board.snakes[i].body[j].x == x && board.snakes[i].body[j].y == y){
              return false;
          }
      }
  }
  for (var i = 0; i < you.body.length; i++){
    if (you.body[i].x == x && you.body[i].y == y){
      return false;
    }
  }
  return true;
}

function panicMove(board, height, width, you){
  var x = you.body[0].x;
  var y = you.body[0].y;

  if (snakeCollision(board, x - 1, y) == false){
    return "left";
  } else if (snakeCollision(board, x + 1, y) == false){
    return "right";
  } else if (snakeCollision(board, x, y - 1) == false){
    return "down";
  } else {
    return "up";
  }

  /*
    var upC = 0;
    var downC = 0;
    var leftC = 0;
    var rightC = 0;

    var ogX = you.body[0].x;
    var ogY = you.body[0].y;
    
    var x = ogX;
    var y = ogY;
    
    while (x >= 0){
        x--;
        if (snakeCollision(board, you, x, y)){
            break;
        }
        leftC++;
    }
    x = ogX;
    y = ogY;
    while (x < width - 1){
        x++;
        if (snakeCollision(board, you, x, y)){
            break;
        }
        rightC++;
    }
    x = ogX;
    y = ogY;
    while (y >= 0){
        y--;
        if (snakeCollision(board, you, x, y)){
            break;
        }
        downC++;
    }
    x = ogX;
    y = ogY;
    while (y < height - 1){
        y++;
        if (snakeCollision(board, you, x, y)){
            break;
        }
        upC++;
    }
    
    var max = Math.max(upC, leftC, downC, rightC);
    if (max == upC){
        return 'up';
    } else if (max == leftC){
        return 'left';
    } else if (max == downC){
        return 'down';
    } else {
        return 'right';
    }
    */
}

function checkCorners(snake, board){
  //check if in a corner
  if (snake[0].x == 0){
    if (snake[0].y == 0){
      if (snake[1].x == 0){
        return 'right';
      } else {
        return 'up';
      }
    } else if (snake[0].y == board.height - 1){
      if (snake[1].x == 0){
        return 'right';
      } else {
        return 'down';
      }
    }
  } else if (snake[0].x == board.width - 1){
    if (snake[0].y == 0){
      if (snake[1].y == 0){
        return 'up';
      } else {
        return 'left';
      }
    } else if (snake[0].y == board.height - 1){
      if (snake[1].x == board.height -1){
        return 'left';
      } else {
        return 'down';
      }
    }
  } else {
      return null;
  }
} 
