<template>
    <div id="game">
        <a href="/" class="btn btn-warning" id="backToMenu">Back</a>
        <!-- <div id="startmenu" v-show='startmenu'>
            <button id='playpvp' v-on:click='playpvp' class="btn btn-success startmenuBtn">play with other person?</button>
            <button id="playai" class="btn btn-warning startmenuBtn">play with computer?</button>
        </div> -->
        <div id="game-view">
            <div id="g-v-title">
                {{message}}
            </div>
            <div id="g-v-square">
                <div v-on:click='makeMove(i)' v-bind:class='{highlighted: square.isHighlighted}' v-for='(square, i) in squares' class="g-v-square">
                    {{square.value}}
                </div>
            </div>
            <button class="btn btn-danger" v-on:click='reset()' id="newgame">
                New game
            </button>
        </div>
    </div>
</template>


<script type="text/javascript">
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
    /**/
var variable = 0;
var ai = false;

let activePvp = new Game();

var data = { activePvp }
import event from './event'
export default {
    name: 'game',
    data() {
        return activePvp
    },
    // methods: {
    //     playpvp: function() {
    //         $(document).ready(function() {
    //             $('#startmenu').hide();
    //             $('#game-view').show();
    //         });
    //     }
    // },
    computed: {
        // pvp: function(variable) {
        //     return (variable == 1) ? true : false;
        // },
        // startmenu: function(variable) {
        //     return (variable == 1) ? false : true;
        // },
        message: function() {
            if (this.dangchoi) {
                return 'It is ' + this.turn + ' turn';
            } else {
                if (this.winner == 'X') {
                    return 'X win the game!';
                } else if (this.winner == 'O') {
                    return 'O win the game!';
                } else {
                    return 'draw!';
                }
            }
        }
    }
}
</script>
<style>
    body {
    background-color: #ccc;
}
#backToMenu {
  position: fixed;
  top: 20px;
  left: 20px;
  display: inline;
  opacity: 0;
  transition: all ease 0.8s;
}
#backToMenu:hover {
  opacity: 1;
}

#startmenu {
    display: flex;
    justify-content: center;
    align-items: center;
}

.startmenuBtn {
    margin-top: 10%;
    width: 200px;
    height: 80px;
    margin-left: 20px;
    font-weight: bold;
}


/*game view*/
#game-view {
    width: 500px;
    margin: 0 auto;
    border: 1px solid #000;
    background-color: #fff;
}

#g-v-title {
    padding: 15px;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    background-color: #eee;
}

#g-v-square {
    height: 500px;
    display: flex;
    flex-wrap: wrap;
    padding: 25px;
    box-sizing: border-box;
}

.g-v-square {
    width: 33%;
    height: 33%;

    display: flex;
    justify-content: center;
    align-content: center;

    box-sizing: border-box;
    font-family: cursive;
    font-size: 25px;
    text-transform: uppercase;

    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none; 
}

.g-v-square.highlighted {
    color: green;
}

.g-v-square:hover {
    background-color: #eee; 
}

.g-v-square:nth-child(-n + 6) {
    border-bottom: 15px solid brown; 
}
.g-v-square:nth-child(3n + 1), .g-v-square:nth-child(3n + 2) {
    border-right: 15px solid brown; 
}

#newgame {
    float: right;
}


</style>