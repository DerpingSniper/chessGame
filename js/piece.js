var piece = function (col, typ, x, y) {
	this.color = col;
	this.type = typ;
	this.active = false;
	this.x = x;
	this.y = y;
	this.w = 100;
	this.h = 100;
	this.firstMove = true;

	this.move = function (x, y) {
		var valid = this.checkIfValid(x, y);
		console.log(valid);
		if (valid) {
			boardArray[x][y] = null;
			boardArray[x][y] = this;
			boardArray[this.x][this.y] = null;
			boardArray[x][y].x = x;
			boardArray[x][y].y = y;
			this.firstMove = false;
			this.crown();
		}
	};

	switch (typ) {
	case "pawn":
		this.checkIfValid = function (x, y) {
			if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
				if (this.color == "b") {
					if ((y - this.y) == 1) {
						//One forward move
						if (x - this.x == 0 && !boardArray[x][y]) return true;
						//Diagonal
						else if (Math.abs(x - this.x) == 1 && boardArray[x][y] && boardArray[x][y].color != this.color) return true;
					}
					//Two forward move
					else if (this.y - y == 2 && this.x - x == 0) {
						if (!this.firstMove) return false;
						if (boardArray[x][y - 1]) return false;
						return true;
					}
				} else {
					if ((this.y - y) == 1) {
						//One forward move
						if (this.x - x == 0 && !boardArray[x][y]) return true;
						//Diagonal
						else if (Math.abs(this.x - x) == 1 && boardArray[x][y] && boardArray[x][y].color != this.color) return true;
					}
					//Two forward move
					else if (this.y - y == 2 && this.x - x == 0) {
						if (!this.firstMove) return false;
						if (boardArray[x][y + 1]) return false;
						return true;
					}
				}
			}
			return false;
		}
		break;
	case "rook":
		this.checkIfValid = function (x, y) {
			if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
				var xx;
				var yy;

				var xInc;
				var yInc;

				var distX = x - this.x;
				var distY = y - this.y;

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

				if (x == this.x) {
					for (var i = 1; i < Math.abs(distY); i++) {
						xx = this.x;
						yy = i * yInc + this.y;

						if (boardArray[xx][yy]) return false;
					}
				} else if (this.y == y) {
					for (var i = 1; i < Math.abs(distX); i++) {
						xx = i * xInc + this.x;
						yy = this.y;

						if (boardArray[xx][yy]) return false;
					}
				}

				if (x == this.x || y == this.y) return true;
			}
			return false;
		};
		break;
	case "knight":
		this.checkIfValid = function (x, y) {
			if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
				if (Math.abs(x - this.x) == 1 && Math.abs(y - this.y) == 2) return true;
				else if (Math.abs(x - this.x) == 2 && Math.abs(y - this.y) == 1) return true;
			}
			return false;
		}
		break;
	case "bishop":
		this.checkIfValid = function (x, y) {
			if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
				var distX = x - this.x;
				var distY = y - this.y;
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
						xx = i * xInc + this.x;
						yy = i * yInc + this.y;

						if (boardArray[xx][yy]) return false;
					}
					return true;
				}
			}
			return false;
		}
		break;
	case "queen":
		this.checkIfValid = function (x, y) {
			if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
				//Diagonal
				if (Math.abs(x - this.x) == Math.abs(y - this.y)) {
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
						xx = i * xInc + this.x;
						yy = i * yInc + this.y;

						if (boardArray[xx][yy]) return false;
					}
					return true;
				}
				//Straight
				else if (x == this.x || y == this.y) {
					var xx;
					var yy;

					var xInc;
					var yInc;

					var distX = x - this.x;
					var distY = y - this.y;

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

					if (x == this.x) {
						for (var i = 1; i < Math.abs(distY); i++) {
							xx = this.x;
							yy = i * yInc + this.y;

							if (boardArray[xx][yy]) return false;
						}
					} else if (this.y == y) {
						for (var i = 1; i < Math.abs(distX); i++) {
							xx = i * xInc + this.x;
							yy = this.y;

							if (boardArray[xx][yy]) return false;
						}
					}

					if (x == this.x || y == this.y) return true;
				}
			}
			return false;
		}
		break;
	case "king":
		this.checkIfValid = function (x, y) {
			if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
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

	this.crown = function () {
		if (typ == "pawn") {
			if (col == "b" && this.y == 7) {
				this.checkIfValid = function (x, y) {
					if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
						//Diagonal
						if (Math.abs(x - this.x) == Math.abs(y - this.y)) {
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
								xx = i * xInc + this.x;
								yy = i * yInc + this.y;

								if (boardArray[xx][yy]) return false;
							}
							return true;
						}
						//Straight
						else if (x == this.x || y == this.y) {
							var xx;
							var yy;

							var xInc;
							var yInc;

							var distX = x - this.x;
							var distY = y - this.y;

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

							if (x == this.x) {
								for (var i = 1; i < Math.abs(distY); i++) {
									xx = this.x;
									yy = i * yInc + this.y;

									if (boardArray[xx][yy]) return false;
								}
							} else if (this.y == y) {
								for (var i = 1; i < Math.abs(distX); i++) {
									xx = i * xInc + this.x;
									yy = this.y;

									if (boardArray[xx][yy]) return false;
								}
							}

							if (x == this.x || y == this.y) return true;
						}
					}
					return false;
				}
				this.type = "queen";
			} else if (col == "w" && this.y == 0) {
				this.checkIfValid = function (x, y) {
					if (!boardArray[x][y] || boardArray[x][y].color != this.color) {
						//Diagonal
						if (Math.abs(x - this.x) == Math.abs(y - this.y)) {
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
								xx = i * xInc + this.x;
								yy = i * yInc + this.y;

								if (boardArray[xx][yy]) return false;
							}
							return true;
						}
						//Straight
						else if (x == this.x || y == this.y) {
							var xx;
							var yy;

							var xInc;
							var yInc;

							var distX = x - this.x;
							var distY = y - this.y;

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

							if (x == this.x) {
								for (var i = 1; i < Math.abs(distY); i++) {
									xx = this.x;
									yy = i * yInc + this.y;

									if (boardArray[xx][yy]) return false;
								}
							} else if (this.y == y) {
								for (var i = 1; i < Math.abs(distX); i++) {
									xx = i * xInc + this.x;
									yy = this.y;

									if (boardArray[xx][yy]) return false;
								}
							}

							if (x == this.x || y == this.y) return true;
						}
					}
					return false;
				}
				this.type = "queen";
			}
		}
	}
};
