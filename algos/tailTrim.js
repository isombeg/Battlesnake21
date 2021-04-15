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
    //delete all snakes from the copied board
    for(snake of boardCp.snakes){
        if(snake.id !== you.id){
          if (snake.length > 3){
            snake.body = snake.body.slice(0, snake.length - 3);
            //snake.body = [{x:snake.head.x,y:snake.head.y}];
            snake.length = snake.length - 3;
          } else {
            snake.body = [{x:snake.head.x,y:snake.head.y}];
            snake.length = 1;
          }
            
        }
    }
    // boardCp.snakes = {}
    // for(snake of board.snakes){
    //     if(snake.id !== you.id){
    //         boardCp.snakes.push({
    //             body:{
    //                 x:snake.head.x,
    //                 y:snake.head.y
    //             },
    //             id:snake.id,
    //             length: 1
    //         })
    //     }
    // }
    // board.snakes.foreach(function(snake){
    //     if(snake.id !== you.id){
    //         boardCp.snakes.push({
    //             body:{
    //                 x:snake.head.x,
    //                 y:snake.head.y
    //             },
    //             id:snake.id,
    //             length: 1
    //         })
    //     }
    // })
    return boardCp;
}


module.exports = tailTrim;