const bodyParser = require('body-parser')
const express = require('express')
const PF = require('pathfinding');

<script type="text/javascript" src="path/to/pathfinding-browser.min.js"></script>

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))


function handleIndex(request, response) {
  var battlesnakeInfo = {
    apiversion: '1',
    author: '',
    color: '#888888',
    head: 'default',
    tail: 'default'
  }
  response.status(200).json(battlesnakeInfo)
}

function handleStart(request, response) {
  var gameData = request.body

  console.log('START')
  response.status(200).send('ok')
}




function handleMove(request, response) {
  var gameData = request.body

  //var possibleMoves = ['up', 'down', 'left', 'right']
  //var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
  
  var generatedMove = 'up';
  var possibleMoves = ['up', 'down', 'left', 'right'];
  
  //var grid = createMap(request.board.width, request.board.height);
  var grid = new PF.Grid(request.board.width, request.board.height);
  var finder = new PF.AStarFinder();
  
  var snake = [];
  var food = [];
  
  var cornerMove = checkCorners(req.body);
  var dangerousFlag = false;

  
  //WILL NEED TO MAKE THIS FUNCTION
  modifyGrid(grid);
  
  
  //check if in a corner
  if (snake[0].x == 0){
    if (snake[0].y == 0){
      if (snake[1].x == 0){
        response = { "move": "right" }
        return;
      } else {
        response = { "move": "down" }
        return;
      }
    } else if (snake[0].y == request.board.height - 1){
      if (snake[1].x == 0){
        response = { "move": "right" }
        return;
      } else {
        response = { "move": "up" }
        return;
      }
    }
  } else if (snake[0].x == request.board.width - 1){
    if (snake[0].y == 0){
      if (snake[1].y == 0){
        response = { "move": "up" }
        return;
      } else {
        response = { "move": "left" }
        return;
      }
    } else if (snake[0].y == request.board.height - 1){
      if (snake[1].x == request.board.height -1){
        response = { "move": "left" }
        return;
      } else {
        response = { "move": "down" }
        return;
      }
    }
  }
  
  
  
  //Compute the path to both your tail and the closest piece of food on the board
  //this should be a*?
  var closestFood = findClosestFood(food);
  
  var tempMoveFood = finder.findPath(snake[0].x, closestFood.x, closestFood.y, grid);
  
  //If you are hungry and there exists a path to the closest piece of food, make the best move to get closer to the food.
  //40 is arbitrary we can change
  if (health < 40 && tempMoveFood != null){
    return moveToRequest(tempMoveFood);
  }
  
  //If you are not hungry or there doesn’t currently exist a path to the food, check to see if there is a path to your tail
  //if there is, then make the best move to get closer to your tail.
  var tempMoveTail = finder.findPath(snake[0].x, snake[0].y, snake[snake.length - 1].x, snake[snake.length - 1].y, grid);
  if (tempMoveTail != null){
    return moveToRequest(tempMoveTail);
  }
  
  //If there isn’t a path to your tail, make a move in the direction with the most “promise.”
  var tempMoveFlood = floodFill();
  if (tempMoveFlood != null){
    return movetoRequest(tempMoveFlood);
  }

  //if we reach here what do we do?
  return { "move": "up" }
}



function handleEnd(request, response) {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}

















// custom code

//TODO:
function modifyGrid(grid){
  //need to add snakes, food, etc.
}
function findClosestFood(food){
  //find closest food from array
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
