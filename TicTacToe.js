"use strict";

function Player (symbol) {
  this.symbol = symbol;
  this.turns = 0;
};

function Board (slots) {
	var board = Object.create(Array.prototype);
  board = Array.apply(board, [slots]);
  for (var method in Board.prototype) {
    if (Board.prototype.hasOwnProperty(method)) {
      board[method] = Board.prototype[method];
    }
  }
  return board;
};

Board.prototype.setSlot = function (slot, symbol) {
  if (typeof this[slot] === "undefined") {
    this[slot] = symbol;
    return true;
  } else {
    return false; // taken
  }
};


Board.prototype.print = function () {
  var array = [];
  for (var i = 0; i < this.length; i++) {
    if (typeof this[i] === "undefined") {
      array.push("-");
    } else {
      array.push(this[i]);
    }
  }
  console.log("-----");
  console.log(array[0] + " " + array[1] + " " + array[2]);
  console.log(array[3] + " " + array[4] + " " + array[5]);
  console.log(array[6] + " " + array[7] + " " + array[8]);
  console.log("-----");
};

Board.prototype.isWinner = function (symbol) {
  // check columns
  var step = 3;
  var i = 0;
  while (i < this.length / step) {
    if (this[i] === symbol && this[i + step] === symbol && this[i+ step * 2] === symbol) {
      return true;
    } else {
      i++;
    }
  }
  // check rows
  step = 1;
  i = 0;
  while (i < this.length / step) {
    if (this[i] === symbol &&	this[i + step] === symbol && this[i+ step * 2] === symbol) {
			return true;
    } else {
      i = i + 3;
    }
  }
  // check diagonal \
  step = 4;
  if (this[0] === symbol &&	this[step] === symbol && this[step * 2] === symbol) {
		return true;
  }
  // check diagonal /
  step = 2;
  if (this[step] === symbol && this[step * 2] === symbol && this[step * 3] === symbol) {
    return true;
  }
  return false;
};

function TicTacToe (symbol1, symbol2) {

  var winner = null;
  var board = new Board(9);
  var player1 = new Player(symbol1);
  var player2 = new Player(symbol2);

  var isWinner = function (player) {
	  if (player.turns < 3) return false;
    if (board.isWinner(player.symbol)) {
			winner = player;
			return true;
    } else {
    	return false;
    }
  };

  var getWinner = function () {
    return winner;
  };

  var play = function (slot, player) {
    if (winner) return false;
    var set = board.setSlot(slot, player.symbol);
    if (set) player.turns++;
    return set;
  };

  var getPlayers = function () {
    return [player1, player2]
  };

  var randomPlay = function () {
    var plays = 0;
    var foundSlot = false;
    var slot = null;
    var player = null;
    var won = false;
    while (!won && plays < 9) {
      if (plays % 2 === 0) {
        player = player1;
      } else {
        player = player2;
      }
      foundSlot = false;
      while (!foundSlot) {
        slot = parseInt(Math.random() * 10);
        if (slot < 9) {
          foundSlot = play(slot, player);
        }
      }
      plays++;
      board.print();
      won = isWinner(player);
    }
    return winner;
  };

  return {
    getPlayers: getPlayers,
    play: play,
    randomPlay: randomPlay,
    getWinner: getWinner
  };

};

var tic = new TicTacToe(0, 1);
tic.randomPlay();
console.log(tic.getWinner() || "Nobody won");
