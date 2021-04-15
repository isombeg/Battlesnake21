const appendHead = (bsnake, newBattleSnakes, x, y) => {
    //console.log('headAppend >', 'appending head to', bsnake.name, '\n')
    let newBSnake = JSON.parse(JSON.stringify(bsnake));
    newBSnake.head = {
        'x': x,
        'y': y
    };
    newBSnake.body.unshift(newBSnake.head)
    newBSnake.length++;
    newBSnake.id = bsnake.id + '-' + x.toString() + '-' + y.toString();

    //console.log('headAppend >', 'appendHead >',
    //    '\nold battlesnake:', bsnake,
    //    '\nnew battlesnake', newBSnake
    //)
    newBattleSnakes.push(newBSnake);
}

const appendHeadLeft = (bsnake, newBattleSnakes, filledCoords) => {
    const {x, y} = bsnake.head;
    if(x != 0 && !(filledCoords.has(x - 1) && filledCoords.get(x - 1).has(y))){
        //console.log('headAppend >', 'append left:', bsnake.id)
        appendHead(bsnake, newBattleSnakes, x - 1, y)
        return true;
    }

    return false;
}

const appendHeadRight = (bsnake, newBattleSnakes, filledCoords, width) => {
    const {x, y} = bsnake.head;
    if(x != width - 1 && !(filledCoords.has(x + 1) && filledCoords.get(x + 1).has(y))){
        //console.log('headAppend >', 'append right:', bsnake.id)
        appendHead(bsnake, newBattleSnakes, x + 1, y)
        return true;
    }

    return false;
}

const appendHeadDown = (bsnake, newBattleSnakes, filledCoords) => {
    const {x, y} = bsnake.head;
    if(y != 0 && !(filledCoords.has(x) && filledCoords.get(x).has(y-1))){
        //console.log('headAppend >', 'append down:', bsnake.id)
        appendHead(bsnake, newBattleSnakes, x, y - 1);
        return true;
    }

    return false;
}

const appendHeadUp = (bsnake, newBattleSnakes, filledCoords, height) => {
    const {x, y} = bsnake.head;
    if(y != height - 1 && !(filledCoords.has(x) && filledCoords.get(x).has(y+1))){
        //console.log('headAppend >', 'append up:', bsnake.id)
        appendHead(bsnake, newBattleSnakes, x, y + 1);
        return true;
    }

    return false;
}

const findOccupiedSquares = (filledCoords, battleSnakes) => {
    for(bsnake of battleSnakes){
        for(coords of bsnake.body){
            if(!filledCoords.has(coords.x)){
                filledCoords.set(coords.x, new Set())
            }
            filledCoords.get(coords.x).add(coords.y)
        }
    }
}

const headAppend = (board, you) => {
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard.snakes = new Array();
    let filledCoords = new Map();

    findOccupiedSquares(filledCoords, board.snakes)

    for(bsnake of board.snakes){
        if(bsnake.id === you.id){
            newBoard.snakes.push(JSON.parse(JSON.stringify(bsnake)));
            //console.log('headAppend >', 'adding \'you\' to modified board');
            continue;
        }

        let appendResults = [
            appendHeadLeft(bsnake, newBoard.snakes, filledCoords),
            appendHeadDown(bsnake, newBoard.snakes, filledCoords),
            appendHeadRight(bsnake, newBoard.snakes, filledCoords, board.width),
            appendHeadUp(bsnake, newBoard.snakes, filledCoords, board.height)
        ];
        
        let trues = appendResults.filter(
            result => result === true
        );

        if(!trues.length){
            newBoard.snakes.push(JSON.parse(JSON.stringify(bsnake)));
        }
    }
    
    //console.log('headAppend >', 'headAppend result:', newBoard);
    //console.log(board);
    return newBoard;
}

module.exports = headAppend;