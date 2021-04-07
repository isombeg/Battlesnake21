// var prevColor;
// var node;
// var replacementColor;
var size = 8; 

function floodFill(x, y, prevColor, replacementColor){
    if (x<0 || x >=size || y<0 || y>=size){
        return;
    } 
    //if current color is not prevColor return;
    //if current color is replacementColor return;
    floodFill(x+1,y,prevColor,replacementColor);
    floodFill(x-1,y,prevColor,replacementColor);
    floodFill(x,y+1,prevColor,replacementColor);
    floodFill(x,y-1,prevColor,replacementColor);

}


// function isBeside(x,y){
    
// }