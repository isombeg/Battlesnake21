// const PF = require('pathfinding');

//TODO :: store walkable areas of enemy snakes
//copy of the board, store childdren, trim every other snake other than me
//reveived the board from dispatcher, create a copy, and modify the board. 
//board object. (snakes node)
// iterate by snake, and compare ids (with mine)
//if not ours, first element of the array (body_)
//snake.length = 1;
//return the board object 

function tailTrim(board,you){
    //create a deep copy of the board
    var boardCp = JSON.parse(JSON.stringify(board));
    boardCp.snakes.forEach(snake => {
        if(snake.id !== you.id){
            snake.body = [snake.body[0]];
            snake.length = 1
            //console.log('tailTrim', snake.name, snake);
        }
    });
    return boardCp;
}


module.exports = tailTrim;