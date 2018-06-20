class square{
	constructor(){
		this.value = null;
		this.isHighlighted = false;
	}
}

class Game {
	constructor(){
		this.dangchoi = true;
		this.winner = null;
		this.turn = Game.O;//o duoc danh truoc
		this.moves = 0;
		this.squares = new Array(9).fill().map(s => new square());
		this.makeMove = function(i){//choi
			if(this.dangchoi && !this.squares[i].value){
				this.squares[i].value = this.turn;

				this.moves ++;
				this.checkWinner();
				this.turn = (this.turn === Game.O) ?  Game.X : Game.O;
			}
		}

		this.checkWinner = function(){
			const winState = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6]		
			];

			winState.forEach((wc)=>{
				const [a,b,c] = wc;
				const sqA = this.squares[a];
				const sqB = this.squares[b];
				const sqC = this.squares[c];

				//check xem ở ô A có giá trị chưa và nó có bằng ở B và C không
				if (sqA.value && sqA.value === sqB.value && sqA.value === sqC.value) {
					this.dangchoi =false;
					this.winner = sqA.value;
					this.squares[a].isHighlighted = this.squares[b].isHighlighted = this.squares[c].isHighlighted = true;		
				}
			});

			if(this.moves == 9/*this.squares.length /*9*/) {
				this.dangchoi = false;
			}
		}

		this.reset = function() {
			this.dangchoi = true;
			this.winner = null;
			this.turn = Game.O;//o duoc danh truoc
			this.moves = 0;
			this.squares = new Array(9).fill().map(s => new square());
		}
	}
}

Game.X = 'X';
Game.O = 'O';