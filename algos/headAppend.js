const appendHead = (newBattleSnakes, x, y) => {
    let newBSnake = new Object();
    newBSnake.head = {
        'x': x,
        'y': y
    };
    newBSnake.body.unshift(newBSnake.head)
    newBSnake.length++;
    newBattleSnakes.push(bsnake);
}

const appendHeadLeft = (bsnake, newBattleSnakes, filledCoords) => {
    const {x, y} = bsnake.head;
    if(x != 0 && !(filledCoords.has(x - 1) && filledCoords.get(x - 1).has(y))){
        appendHead(newBattleSnakes, x - 1, y)
    }
}

const appendHeadRight = (bsnake, newBattleSnakes, filledCoords, width) => {
    const {x, y} = bsnake.head;
    if(x != width - 1 && !(filledCoords.has(x + 1) && filledCoords.get(x + 1).has(y))){
        appendHead(newBattleSnakes, x + 1, y)
    }
}

const appendHeadDown = (bsnake, newBattleSnakes, filledCoords) => {
    const {x, y} = bsnake.head;
    if(y != 0 && !(filledCoords.has(x) && filledCoords.get(x).has(y-1))){
        appendHead(newBattleSnakes, x, y - 1);
    }
}

const appendHeadUp = (bsnake, newBattleSnakes, filledCoords, height) => {
    const {x, y} = bsnake.head;
    if(y != height - 1 && !(filledCoords.has(x) && filledCoords.get(x).has(y+1))){
        appendHead(newBattleSnakes, x, y + 1);
    }
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
    let newBoard = {...board};
    newBoard.snakes = new Object();
    let filledCoords = new Map();

    findOccupiedSquares(filledCoords, board.snakes)

    for(bsnake of board.snakes){
        if(bsnake.id === you.id){
            newBoard.push(bsnake)
            continue;
        }
        
        appendHeadLeft(bsnake, newBoard.snakes, filledCoords);
        appendHeadDown(bsnake, newBoard.snakes, filledCoords);
        appendHeadRight(bsnake, newBoard.snakes, filledCoords, board.width);
        appendHeadUp(bsnake, newBoard.snakes, filledCoords, board.height);
    }
    
    return newBoard;
}

module.exports = headAppend;