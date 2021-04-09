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

    //need to add stuff
    addToGrid(grid);

    //tail trimmed board
    var tailTrimGrid = tailTrim(game, turn, board, you);
    var finalGrid = headAppend(grid);

    //var dangerousFlag = false;


    //check if in corner
    var cornerMove = checkCorners(snake, board);
    if (cornerMove != null){
        return cornerMove;
    }


    //Compute the path to both your tail and the closest piece of food on the board
    //this should be a*?
    var closestFood = findClosestFood(food);
    var tempMoveFoodPath = finder.findPath(snake[0].x, closestFood.x, closestFood.y, grid);
    var tempMoveFood = toPath(snake[0], tempMoveFoodPath[0]);

    //If you are hungry and there exists a path to the closest piece of food, make the best move to get closer to the food.
    //40 is arbitrary we can change
    if (health < 40 && tempMoveFood != null){
        return tempMoveFood;
    }

    //If you are not hungry or there doesn’t currently exist a path to the food, check to see if there is a path to your tail
    //if there is, then make the best move to get closer to your tail.
    var tempMoveTailPath = finder.findPath(snake[0].x, snake[0].y, snake[snake.length - 1].x, snake[snake.length - 1].y, grid);
    var tempMoveTail = toPath(snake[0], tempMoveTailPath[0]);
    if (tempMoveTail != null){
      return tempMoveTail;
    }


    //If there isn’t a path to your tail, make a move in the direction with the most “promise.”
    var tempMoveFlood = floodFill();
    if (tempMoveFlood != null){
      return tempMoveFlood;
    }

    //if we reach here what do we do?
    return panicMove(game, turn, board, you);
}

    
    
    
    
    
    
    



// custom code

//TODO:
function modifyGrid(grid){
    //need to add snakes, food, etc.
}

function findClosestFood(food, head){
    //find closest food from array
    var minDist = null;

    for (var i = 0; i < food.length; i++){
        
    }
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
  
  
  
  
  //DONE:
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
