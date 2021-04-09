var size; 
var x = you.body[0].x;
var y = you.body[0].y;

var directions = [];
//use possibleMoves from index.js


//https://www.npmjs.com/package/n-dimensional-flood-fill
//update to return array of positions
//seed : starting node

var grid = new PF.Grid(request.board.width, request.board.height); //could be moved to dispatcher
var getter = function (x, y) {return grid[x][y];};

function floodFill(possibleMoves, you, seed, result, getter, directions) {
    var flood = [];
    possibleMoves.forEach(move=>{
        if (move === 'up') {
            result = floodFill({
                getter: getter,
                seed: [you.body[0].x,you.body[0].y-1],
                onFlood: function (x, y) {
                    flood.push(seed);
                }
            });
            directions.push({move,flood});
        } else if (move === 'down') {
            result = floodFill({
                getter: getter,
                seed: [you.body[0].x,you.body[0].y+1],
                onFlood: function (x, y) {
                    flood.push(seed);
                }
            });
            directions.push({move,flood});
        } else if (move === 'left') {
            result = floodFill({
                getter: getter,
                seed:[you.body[0].x-1,you.body[0].y],
                onFlood: function (x, y) {
                    flood.push(seed);
                }
            });
            directions.push({move,flood});
        } else if (move === 'right') {
            result = floodFill({
                getter: getter,
                seed: [you.body[0].x+1,you.body[0].y],
                onFlood: function (x, y) {
                    flood.push(seed);
                }
            });
            directions.push({move,flood});
        }
    });
    return directions;
}

//  //base case :
//     //if current color is not prevColor return;
//     //if current color is replacementColor return;
//     if (x<0 || x >=size || y<0 || y>=size){
//         return;
//     } 
//     //TODO :: change color of current position -> depend on how to decide colors

//     //directions
//     floodFill(x+1,y,prevColor,replacementColor);
//     floodFill(x-1,y,prevColor,replacementColor);
//     floodFill(x,y+1,prevColor,replacementColor);
//     floodFill(x,y-1,prevColor,replacementColor);

//     return direction;