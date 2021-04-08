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
    var food = [];

    //need to add stuff
    modifyGrid(grid);

    //tail trimmed board
    var tailTrimGrid = tailTrim(game, turn, board, you);

    var dangerousFlag = false;


    //check if in corner
    var cornerMove = checkCorners(snake, board);
    if (cornerMove != null){
        return cornerMove;
    }


    //Compute the path to both your tail and the closest piece of food on the board
    //this should be a*?
    var closestFood = findClosestFood(food);
    var tempMoveFood = finder.findPath(snake[0].x, closestFood.x, closestFood.y, grid);

    //If you are hungry and there exists a path to the closest piece of food, make the best move to get closer to the food.
    //40 is arbitrary we can change
    if (health < 40 && tempMoveFood != null){
        return tempMoveFood;
    }

    //If you are not hungry or there doesn’t currently exist a path to the food, check to see if there is a path to your tail
    //if there is, then make the best move to get closer to your tail.
    var tempMoveTail = finder.findPath(snake[0].x, snake[0].y, snake[snake.length - 1].x, snake[snake.length - 1].y, grid);
    if (tempMoveTail != null){
      return tempMoveTail;
    }


    //If there isn’t a path to your tail, make a move in the direction with the most “promise.”
    var tempMoveFlood = floodFill();
    if (tempMoveFlood != null){
      return tempMoveFlood;
    }

    //if we reach here what do we do?
    return 'up';
}

    
    
    
    
    
    
    



// custom code

//TODO:
function modifyGrid(grid){
    //need to add snakes, food, etc.

    enum{
        empty
        food
        snake - every snake including ourself - our head
    }
}
function findClosestFood(food, head){
    //find closest food from array
    var minDist = null;

    for (var i = 0; i < food.length; i++){
        
    }
}
  
  
  
  
  //DONE:
  function moveToRequest(move){
    if (move == "up"){
      return { "move": "up" }
    } else if (move == "down"){
      return { "move": "down" }
    } else if (move == "right"){
      return { "move": "right" }
    } else if (move == "left"){
      return { "move": "left" }
    } else {
      console.log("error in move");
    }
  }
  
  function createMap(columnCount, rowCount) {
     const map = [];
     for (let x = 0; x < columnCount; x++) {
         map[x] = [];
         for (let y = 0; y < rowCount; y++) {
            addCell(map, x, y);
         }
     }
     return map;
  }
  
  function replaceCell(map, x, y, item) {
      map[x][y] = item; // create a new object on x and y
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
