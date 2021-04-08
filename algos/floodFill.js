var size; 
var x;
var y;


function isBeside(currPos,enemyPos){
    if (currPos.col + 1 == enemyPos)
        return false;
    if (currPos.col -1 == enemyPos)
        return false;
    if (currPos.row +1 == enemyPos)
        return false;
    if (currPos.row - 1 == enemyPos)
        return false;
    return true;
}


function floodFill(x, y, prevColor, replacementColor){
    //base case :
    //if current color is not prevColor return;
    //if current color is replacementColor return;
    if (x<0 || x >=size || y<0 || y>=size){
        return;
    } 

    //directions
    floodFill(x+1,y,prevColor,replacementColor);
    floodFill(x-1,y,prevColor,replacementColor);
    floodFill(x,y+1,prevColor,replacementColor);
    floodFill(x,y-1,prevColor,replacementColor);

}

