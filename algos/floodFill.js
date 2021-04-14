// const floodFill = require('n-dimensional-flood-fill'); 
const PF = require('pathfinding');


// //maze version? 
// function runLastMinuteMove (board,you){
//     var x = you.head.x;
//     var y = you.head.y;
//     // var boardCp = JSON.parse(JSON.stringify(board));
//     var food = [board.food[0].x,board.food[0],y];

//     var path = [];
//     var grid = new PF.Grid(board.width,board.height);
//     grid.setUnwalkableAt();//use info from dispatcher ? 
//     lastMinuteMove(grid,nodes[x][y],food,path);
// }

// function lastMinuteMove(grid,currPos,endPos,path){ //currPos & endPos : grid[x][y] 
//     var result = 0;
//     grid.setUnwalkableAt(currPos);
//     var right = [currPos.x+1,currPos.y];
//     var left = [currPos.x-1,currPos.y];
//     var up = [currPos.x,currPos.y+1];
//     var down = [currPos.x,currPos.y-1];

//     path.push(currPos);

//     //terminating condition
//     if(currPos == endPos){ //This means path is found
//         return 1; //this will be only returned once when it reached to the endPos
//     }

//     if (grid.canGo(thisCell,right) && right.walkable){ //wall / othersnake check 
//         result = lastMinuteMove(grid,right,endPos,path);
//     }
//     if (result==0 && down.walkable){ //wall / othersnake check 
//         result = lastMinuteMove(grid,down,endPos,path);
//     }
//     if (result==0 && left.walkable){
//         result = lastMinuteMove(grid,left,endPos,path); //wall / othersnake check 
//     }
//     if (result==0 && up.walkable){ //wall / othersnake check 
//         result = lastMinuteMove(grid,up,endPos,path);
//     }

//     if(result == 0){
//         grid.setWalkableAt(currPos);
//         return 0;
//     }
      
//     result ++;//result is added 1 on every recurse
//     return result;

// }
// function canGo(fromPos,toPos){
//     if(isBeside(fromCell,toCell) && toPos.walkable)
//         return true;
//     return false;
// }


//alternative 
function lastMinuteMove(board,you){  //food position ?
    var wall = []; 
    board.snakes.foreach(snake =>{
        if(snake.id !== you.id){
            for (var i=0; i<snake.length;i++){
                wall.push([snake.body[i].x,snake.body[i].y]);
            }
        }
    })
    var x = you.head.x;
    var y = you.head.y;
    var head = [x,y];
    for(var i=1; i<you.length;i++){
        wall.push(you.body[i].x,you.body[i].y);
    }
    return 'up';
}

function findClosestFood(board,you){
    //already implemeted in dispatcher.js
}