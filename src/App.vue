<template>
  <div id="container">
    <div id="app">
      <div id="header">
        <a href="/" class="btn btn-warning" id="backToMenu">Back</a>
        <p v-if='thua'>Kết thúc</p>
      </div>
      <div id="game-board">
       
        <div id="progressbar">
          <div id="bar"></div>
        </div>
        <div id="thongbao">
          
        </div>
        <div id="game" style="margin-top: 50px;">
          {{sothunhat}} {{operator}} {{sothuhai}}
          <hr>
          <button class="score btn btn-primary" @click='firstClick' :disabled='isDisabled'>  {{score1}}  </button>
          <button class="score btn btn-success" @click='secondClick' :disabled='isDisabled'>  {{score2}}  </button>
          <hr>
          <p>
            Điểm: {{score}}
          </p>
          <button class="btn btn-danger" v-if='choilai' @click='restart'>Chơi lại</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import event from "./event" 
export default {
  name: 'app',
  data () {
    return {
      he_so: 100,
      dificult: 0,
      timeout: 20,
      width:0,
      thua:false,
      timer:null,
      score: 0,
      sothunhat:Math.floor((Math.random() * 100) + 1),
      operator: (Math.floor((Math.random() * 100) + 1) >= 50) ? '+' : '-',
      sothuhai:Math.floor((Math.random() * 100) + 1),
      timer: null,
      ran: (Math.floor((Math.random() * 100) + 1) >= 50) ? 0 : 1, // là thuộc tính để xem ô nào sẽ là ô có kết quả đúng
      isDisabled: false,
      choilai: false
    }
  },

  mounted: function() {
      let self = this;
      var pr = document.getElementById('bar');
      this.timer = setInterval(function(){
        if(self.width >= 105) {//quá thời gian mà không chọn
          self.thua = true;
          self.width = 0;
          clearInterval(self.timer);
          self.isDisabled = true;
          self.choilai = true;
        }else {
          self.width ++;
          pr.style.width = self.width + '%';
        }
      }, this.timeout);
  },
  computed: {
    /*Cập nhật giá trị các nút bấm*/
    score1() {
      if(this.operator == '+') {
        return (this.ran == 0) ? this.sothuhai + this.sothunhat : this.sothuhai + this.sothunhat + (Math.floor((Math.random() * 6) + 2));
      }else {
        return (this.ran == 0) ? this.sothunhat - this.sothuhai : this.sothunhat - this.sothuhai + (Math.floor((Math.random() * 6) + 2));
      }
    },
    score2() {
      if(this.operator == '+') {
        return (this.ran == 1) ? this.sothuhai + this.sothunhat : this.sothuhai + this.sothunhat + (Math.floor((Math.random() * 6) + 2));
      }else {
        return (this.ran == 1) ? this.sothunhat - this.sothuhai : this.sothunhat - this.sothuhai + (Math.floor((Math.random() * 6) + 2));
      }
    }
  }


    ,
  methods: {
    firstClick:function() {//click vao button ket qua 1
      if(this.ran == 0) {
        let self = this;

        /*tang do kho khi tang diem*/
        if(this.score >= 5) {
          this.dificult = 5;
        }
        if(this.score >= 10) {
          this.dificult = 8;
        }
        if(this.dificult < Math.floor((Math.random() * 10) + 1)) {
          this.he_so = 100;
        }else {
          this.he_so = 1000;
        }


        /*-------------------------      Thay đổi các giá trị sau mỗi lần click    -----------------------------*/



        this.width = 0;
        this.score ++;
        this.sothunhat = Math.floor((Math.random() * self.he_so) + 1);
        this.sothuhai = Math.floor((Math.random() * self.he_so) + 1);
        this.operator = (Math.floor((Math.random() * 100) + 1) >= 50) ? '+' : '-';
        this.ran = (Math.floor((Math.random() * 100) + 1) >= 50) ? 0 : 1;
      }else {//sai
        clearInterval(this.timer);
        this.thua = true;
        this.isDisabled = true;
        this.choilai = true;
      }
    },
    secondClick:function() {//click vao button ket qua 2
      if(this.ran == 1) {
        let self = this;
        

        /*tang do kho khi tang diem*/
        if(this.score >= 5) {
          this.dificult = 5;
        }
        if(this.score >= 10) {
          this.dificult = 8;
        }
        if(this.dificult < Math.floor((Math.random() * 10) + 1)) {
          this.he_so = 100;
        }else {
          this.he_so = 1000;
        }


        /*-----------------------      Thay đổi các giá trị sau mỗi lần click    -------------------------------*/
        
        this.width = 0;
        this.score++;
        this.sothunhat = Math.floor((Math.random() * self.he_so) + 1);
        this.sothuhai = Math.floor((Math.random() * self.he_so) + 1);
        this.operator = (Math.floor((Math.random() * 100) + 1) >= 50) ? '+' : '-';
        this.ran = (Math.floor((Math.random() * 100) + 1) >= 50) ? 0 : 1;
      }else {//sai
        clearInterval(this.timer);
        this.thua = true;
        this.isDisabled = true;
        this.choilai = true;
      }
    },
    restart:function() {
      let self = this;
      this.he_so = 100;
      this.dificult = 0;
        
      this.thua = false;
      this.sothunhat = Math.floor((Math.random() * self.he_so) + 1);
      this.sothuhai = Math.floor((Math.random() * self.he_so) + 1);
      this.score = 0;
      this.isDisabled = false;
      this.width = 0;
      this.ran = (Math.floor((Math.random() * 100) + 1) >= 50) ? 0 : 1;


      var pr = document.getElementById('bar');
      this.timer = setInterval(function(){
        if(self.width >= 105) {//quá thời gian mà không chọn
          self.thua = true;
          self.width = 0;
          clearInterval(self.timer);
          self.isDisabled = true;
          self.choilai = true;
        }else {
          self.width ++;
          pr.style.width = self.width + '%';
        }
      }, this.timeout);
    }
  }


}
</script>

<style>
#container {
  background-color: rgb(11, 5, 56);
  
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: rgb(11, 5, 56);
  position: fixed;
  top: 0px;
  font-size: 35px;
  width: 100%;
  height: 100%;
}
#game-board {
  position: fixed;
  width: 100%;
  text-align: center;
  top: 100px;
}
#header {
  font-size: 35px;
}
#progressbar {
  width: 500px;
  background-color: #4CAF50;
  margin: auto;
}
#bar {
  width: 1%;
  height: 30px;
  background-color: red;
}
.score {
  margin-left: 50px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
}
</style>
