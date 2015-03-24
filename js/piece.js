var piece = function(col, typ, x, y) {
    this.color = col;
    this.type = typ;
    this.active = false;
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 100;
    this.firstMove = true;
    
    this.move = function (x, y) {
        var valid = this.validMove(x, y);
        if (valid) {
            boardArray[x][y] = null;
            boardArray[x][y] = this;
            boardArray[this.x][this.y] = null;
            boardArray[x][y].x = x;
            boardArray[x][y].y = y;
            this.firstMove = false;
        }
    };
    
    
    switch (typ) {
        case "pawn":
            this.validMove = function (x, y) {
                if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
                    if(this.color == "b") {
                        if (y - this.y == 1) {
                            //One forward move
                            if (x - this.x == 0 && !boardArray[x][y]) return true; 
                            //Diagonal
                            else if (Math.abs(x-this.x) == 1 && boardArray[x][y] && boardArray[x][y].color != this.color) return true;
                        } 
                        //Two forward move
                        else if (y - this.y == 2 && x - this.x == 0 && this.firstMove) return true;
                    } else {
                        if (this.y - y == 1) {
                            //One forward move
                            if (this.x - x == 0 && !boardArray[x][y]) return true;
                            //Diagonal
                            else if (Math.abs(this.x-x) == 1 && boardArray[x][y] && boardArray[x][y].color != this.color) return true;
                        } 
                        //Two forward move
                        else if (this.y - y == 2 && this.x - x == 0 && this.firstMove) return true;
                    }
                }
                return false;
            }
            break;
        case "rook":
            this.validMove = function(x, y) {
                if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
                    if (x == this.x || y == this.y) return true;
                }
                return false;
            };
            break;
        case "knight":
            this.validMove = function(x, y) {
                if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
                    if (Math.abs(x - this.x) == 1 && Math.abs(y - this.y) == 2) return true; 
                    else if (Math.abs(x - this.x) == 2 && Math.abs(y - this.y) == 1) return true;
                }
                return false;
            }
            break;
        case "bishop":
            this.validMove = function(x, y) {
                if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
                    var distX = x-this.x;
                    var distY = y-this.y;
                    if (Math.abs(distX) == Math.abs(distY)) {
                        var xInc;
                        var yInc;
                        if (distX > 0) {
                            xInc = 1;
                        } else {
                            xInc = -1;
                        }
                        
                        if (distY > 0) {
                            yInc = 1;
                        } else {
                            yInc = -1;
                        }
                        
                        var xx;
                        var yy;
                        
                        for (var i = 1; i < Math.abs(distX); i++) {
                            xx = i*xInc+this.x;
                            yy = i*yInc+this.y;
                            
                            console.log(distX + " " + distY);
                            
                            if(boardArray[xx][yy]) return false;
                        }
                        return true;
                    }
                }
                return false;
            }
            break;
        case "queen":
            this.validMove = function(x, y) {
                if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
                    //Diagonal
                    if (Math.abs(x - this.x) == Math.abs(y - this.y)) return true;
                    //Straight
                    else if (x == this.x || y == this.y) return true;
                }
                return false;
            }
            break;
        case "king":
            this.validMove = function(x, y) {
                if (!boardArray[x][y] || boardArray[x][y].color != this.color){
                    //Diagonal
                    if (Math.abs(x - this.x) == Math.abs(y - this.y) && Math.abs(x - this.x) == 1) return true;
                    //Straight
                    else if (Math.abs(x - this.x) == 1 && y - this.y == 0) return true;
                    else if (x - this.x == 0 && Math.abs(y - this.y) == 1) return true;
                }
                return false;
            }
            break;
    }
};