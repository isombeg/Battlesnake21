const PF = require('pathfinding');
const aStarSearch = require('./algos/aStarSearch');
const floodFill = require('./algos/floodFill');
const tailTrim = require('./algos/tailTrim');

exports.dispatcher = (game, turn, board, you) => {
    var generatedMove = 'up';
    var possibleMoves = ['up', 'down', 'left', 'right'];

    var grid = new PF.Grid(request.board.width, request.board.height);
    var finder = new PF.AStarFinder();
    
    var snake = you.body;
    var food = board.food;

    //tail trimmed board
    var tailTrimGrid = tailTrim(game, turn, board, you);
    var finalBoard = headAppend(game, turn, tailTrimGrid, you);
    
    //need to add stuff
    modifyGrid(finalBoard, grid);


    //check if in corner
    var cornerMove = checkCorners(snake, finalBoard);
    if (cornerMove != null && checkMove(cornerMove, game, turn, board, you)){
        return cornerMove;
    }


    //Compute the path to both your tail and the closest piece of food on the board
    //this should be a*?
    var closestFood = findClosestFood(food);
    var tempMoveFoodPath = finder.findPath(snake[0].x, closestFood.x, closestFood.y, grid);
    var tempMoveFood = toPath(snake[0], tempMoveFoodPath[0]);

    //If you are hungry and there exists a path to the closest piece of food, make the best move to get closer to the food.
    //40 is arbitrary we can change
    if (health < 40 && tempMoveFood != null && checkMove(tempMoveFood, game, turn, board, you)){
        return tempMoveFood;
    }

    //If you are not hungry or there doesn’t currently exist a path to the food, check to see if there is a path to your tail
    //if there is, then make the best move to get closer to your tail.
    var tempMoveTailPath = finder.findPath(snake[0].x, snake[0].y, snake[snake.length - 1].x, snake[snake.length - 1].y, grid);
    var tempMoveTail = toPath(snake[0], tempMoveTailPath[0]);
    if (tempMoveTail != null && checkMove(tempMoveTail, game, turn, board, you)){
      return tempMoveTail;
    }


    //If there isn’t a path to your tail, make a move in the direction with the most “promise.”
    var tempMoveFlood = floodFill();
    if (tempMoveFlood != null && checkMove(tempMoveFlood, game, turn, board, you)){
      return tempMoveFlood;
    }

    //if we reach here what do we do?
    return panicMove(game, turn, finalBoard, you);
}

    
    
    
    
    
    
    



// custom code

//TODO:
function modifyGrid(board, grid){
    //need to add snakes, food, etc.
    for (var i = 0; i < board.snakes.length; i++){
        for (var j = 0; j < board.snakes[i].length; j++){
            grid.setWalkableAt(board.snakes[i][j].x, board.snakes[i][j].y, false);
        }
    }
}

function findClosestFood(food, head){
    //find closest food from array
    var minDist;
    var minFood;

    for (var i = 0; i < food.length; i++){
        var tempPath = finder.findPath(head.x, head.y, food[i].x, food[i].y, grid);
        
        if (i == 0){
            minDist = tempPath.length;
        } else {
            if (tempPath.length < minDist){
                minDist = tempPath.length;
                minFood = i;
            }
        }
    }
    return food[minFood];
}


function toPath(head, point){
    if (head.x - point.x == 0){
        if (head.y - point.y == 1){
            return 'up';
        } else if (head.y - point.y == -1){
            return 'down';
        } else {
            console.log("tried to pass point that is not adjacent to snake");
        }
    } else if (head.x - point.x == -1){
        if (head.y - point.y == 0){
            return 'left';
        } else {
            console.log("tried to pass point that is not adjacent to snake");
        }
        
    } else if (head.x - point.x == 1){
        if (head.y - point.y == 0){
            return 'right';
        } else {
            console.log("tried to pass point that is not adjacent to snake");
        }
    } else {
        console.log("tried to pass point that not adjacent to snake");
    }
}
  
function checkMove(move, game, turn, board, you){
    var x;
    var y;
    if (move == 'up'){
        x = snake[0].x;
        y = snake[0].y + 1;
    } else if (move == 'down'){
        x = snake[0].x;
        y = snake[0].y - 1;
    } else if (move == 'left'){
        x = snake[0].x - 1;
        y = snake[0].y;
    } else if (move == 'right'){
        x = snake[0].x - 1;
        y = snake[0].y;
    } else {
        console.log("error move passed");
        return false;
    }
    
    if (x < 0 || y < 0 || x > 10 || y > 10){
        console.log("moving off grid");
        return false;
    }
    for (var i = 0; i < board.snakes.length; i++){
        if (board.snakes[i].id != you.id){
            for (var j = 0; j < board.snakes[i].body.length; j++){
                if (board.snakes[i].body[j].x == x && board.snakes[i].body[j].y == y){
                    console.log("snake collision");
                    return false;
                }
            }
        }
    }
    return true;
}

function panicMove(game, turn, board, you){
    return 'up';
}

  function checkCorners(snake, board){
    //check if in a corner
    if (snake[0].x == 0){
        if (snake[0].y == 0){
          if (snake[1].x == 0){
            return 'right';
          } else {
            return 'down';
          }
        } else if (snake[0].y == board.height - 1){
          if (snake[1].x == 0){
            return 'right';
          } else {
            return 'up';
          }
        }
      } else if (snake[0].x == board.width - 1){
        if (snake[0].y == 0){
          if (snake[1].y == 0){
            return 'up';
          } else {
            return 'left';
          }
        } else if (snake[0].y == request.board.height - 1){
          if (snake[1].x == request.board.height -1){
            return 'left';
          } else {
            return 'down';
          }
        }
      } else {
          return null;
      }
    } 
