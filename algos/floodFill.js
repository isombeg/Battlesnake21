const e = require('express');
const floodFill = require('n-dimensional-flood-fill'); 


//maze version?
function runFloodFill(board,you){
    var x = you.head.x;
    var y = you.head.y;
    var boardCp = {...board};
    var food = [board.food[0].x,board.food[0],y];

    var path = [];
    var grid = new PF.Grid(board.width,board.height);
    grid.setUnwalkableAt();//use info from dispatcher ? 
    performFloodFill(grid,[x,y],food,path);
}

function performFloodFill(grid,currPos,endPos,path){
    var result = 0;
    grid.setUnwalkableAt(currPos);
    var right = [currPos.x+1,currPos.y];
    var left = [currPos.x-1,currPos.y];
    var up = [currPos.x,currPos.y+1];
    var down = [currPos.x,currPos.y-1];

    //terminating condition
    if(currPos == endPos){ //This means path is found
        return 1; //this will be only returned once when it reached to the endPos
    }

    if (grid.canGo(thisCell,right) && right.walkable){ //wall / othersnake check 
        result = performFloodFill(grid,right,endPos,path);
    }
    if (result==0 && down.walkable){ //wall / othersnake check 
        result = performFloodFill(grid,down,endPos,path);
    }
    if (result==0 && left.walkable){
        result = performFloodFill(grid,left,endPos,path); //wall / othersnake check 
    }
    if (result==0 && up.walkable){ //wall / othersnake check 
        result = performFloodFill(grid,up,endPos,path);
    }

    if(result == 0){
        grid.setWalkableAt(currPos);
        return 0;
    }
      
    result ++;//result is added 1 on every recurse
    return result;

}


//purpose of the function 
//https://www.npmjs.com/package/n-dimensional-flood-fill
function floodfill(you,board) {
    
    var grid = new PF.Grid(board.width,board.height); 
    var getter = function (x, y) {return grid[x][y];}; //should set unwalkable area as 0 (walkable as 1) OR get grid instead of board
    var pos = [you.head.x, you.head.y];
    //regardless of 
    //relationship with appendHead? 
    possibleMoves.forEach(move=>{ //should be a possible moves from dispatcher??
        if (move === 'up') {
            result = floodFill({
                getter: getter,
                seed: you.pos,
            });
            directions.push(result.flooded);
        } else if (move === 'down') {
            result = floodFill({
                getter: getter,
                seed: you.pos,
            });
            directions.push(result.flooded);
        } else if (move === 'left') {
            result = floodFill({
                getter: getter,
                seed: you.pos,
            });
            directions.push(result.flooded);
        } else if (move === 'right') {
            result = floodFill({
                getter: getter,
                seed: you.pos,
            });
            directions.push(result.flooded);
        }
    });
    return directions;
}

