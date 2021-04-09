var otherSnakes = []; //TODO :: move to dispatcher


//TODO :: store walkable areas of enemy snakes
//copy of the board, store childdren, trim every other snake other than me
//reveived the board from dispatcher, create a copy, and modify the board. 
//board object. (snakes node)
// iterate by snake, and compare ids (with mine)
//if not ours, first element of the array (body_)
//snake.length = 1;
//return the board object 


function tailTrim (board, you, otherSnakes){
    var boardCp = {...board};
    var grid = new PF.Grid(request.board.width, request.board.height);
    board.snakes.foreach(snake=>{
        if(snake.id !== you.id){
            otherSnakes.push({
                x:snake.body[0].x,
                y:snake.body[0].y,
                id:snake.id,
                length:1
            })
        }
    });
    boardCp = setUnwalkable(otherSnakes, grid);
    return boardCp;
    //should return grid? 
}

//https://www.npmjs.com/package/pathfinding
function setUnwalkable(otherSnakes, grid){
    otherSnakes.foreach(snake => {
        grid.setWalkableAt(snake.x,snake.y,false);
    })
    return grid;
}




exports.default = tailTrim;
