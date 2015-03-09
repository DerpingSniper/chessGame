module.exports = function(col, typ, x, y) {
    this.color = col;
    this.type = typ;
    
    this.x = x*SQUARE_W+50;
    this.y = y*SQUARE_H+50;
    this.w = 100;
    this.h = 100;
};