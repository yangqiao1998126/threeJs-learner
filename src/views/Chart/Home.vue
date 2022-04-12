<template>
<!--  <div class="home">-->
    <div id="dice" class="container">
      <!-- <div class="box box1">
        <div class="origin">
          <div class="plane"></div>
          <div class="plane"></div>
          <div class="plane"></div>
          <div class="plane"></div>
          <div class="plane"></div>
          <div class="plane"></div>
        </div>
      </div> -->
      <div class="box box2">
        <div class="origin">
          <div class="plane"></div>
          <div class="plane"></div>
          <div class="plane"></div>
          <div class="plane"></div>
          <div class="plane"></div>
          <div class="plane"></div>
        </div>
      </div>
      <canvas ref="canvas" width="844px" height="582px"></canvas>
    </div>
<!--  </div>-->
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
  },
  mounted() {
    this.initLine()
    this.$nextTick(() => {
      this.mouse()
    })
  },
  methods:{
    initLine(){
      let canvas = this.$refs.canvas
      let data = [
        // [ [20,20],[20,50],[50,50],[50,400],[100,400],[100,20]],
        [ [150,20],[150,200],[200,200],[200,100],[300,100],[300,220],[450,220],[450,50],[500,50],[500,350]],
        // [ [900,300],[820,300],[820,250],[700,250],[700,350],[550,350],[550,280],[150,280]]
      ]
      let ctx = canvas.getContext("2d");
      data.forEach(v => {
        ctx.beginPath();
        ctx.fillStyle='#fff';
        ctx.lineWidth=6;
        v.forEach( (v2,index) => {
          if(index === 0){
            ctx.moveTo(v2[0], v2[1])
          }else{
            ctx.lineTo(v2[0], v2[1]);
          }

        })
        ctx.stroke();
        ctx.closePath();
        drawRect(ctx,v[0][0],v[0][1])
      })
      data.forEach( v => {
        move(v)
      })
      function move(arr){
        let index = 1
        let initX = arr[index-1][0]
        let initY = arr[index-1][1]
        let nextX = arr[index][0]
        let nextY = arr[index][1]
        let x = arr[index][0] - arr[index-1][0]
        let y = arr[index][1] - arr[index-1][1]
       // for(let i = 0 ; i < arr.length ; i++){
       //   let x = arr[i+1][0] - arr[i][0]
       //   let y = arr[i+1][1] - arr[i][1]
       // }
      let id =  setInterval(() => {

           if(initX >= nextX && initY >= nextY){
             index += 1
             console.log(index,arr.length)
             if(index  === arr.length  ){
               clearInterval(id)
               drawRect1(ctx,initX,initY)
               return
             }
             initX = arr[index-1][0]
             initY = arr[index-1][1]
             nextX = arr[index][0]
             nextY = arr[index][1]
             x = arr[index][0] - arr[index-1][0]
             y = arr[index][1] - arr[index-1][1]

           } else{
             if( x > 0) initX += 2;
             if( x < 0) initX -= 2;
             if( y > 0) initY += 2;
             if( y < 0) initY -= 2
             drawRect1(ctx,initX,initY)
           }
        },50)
      }
      function drawRect(ctx,x = 20, y = 20) {
        ctx.beginPath();
        ctx.arc(x,y,10,0,Math.PI*2,true)
        ctx.fillStyle = "red";
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

      }
      function drawRect1(ctx,x = 20, y = 20) {
        ctx.clearRect(0,0,1024,728);
        data.forEach(v => {
          ctx.beginPath();
          ctx.fillStyle='#fff';
          ctx.lineWidth=6;
          v.forEach( (v2,index) => {
            if(index === 0){
              ctx.moveTo(v2[0], v2[1])
            }else{
              ctx.lineTo(v2[0], v2[1]);
            }

          })
          ctx.stroke();
          ctx.closePath();


        })
        ctx.beginPath();
        ctx.arc(x,y,10,0,Math.PI*2,true)
        ctx.fillStyle = "red";
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

      }
    },
    mouse(){
      let dice = document.getElementById('dice');
      let baseX = this.baseX;
      let baseY = this.baseY;
      dice.addEventListener('mousedown', e => {
        let rotateX = e.clientX;
        let rotateY = e.clientY;

        let move = e => {
          // console.log(baseX, rotateX, e.clientX);
          // console.log(baseY, rotateY, e.clientY);
          this.baseX = baseX - (((e.clientY - rotateY) / 10) % 360)
          this.baseY =  baseY + (((e.clientX - rotateX) / 10) % 360)
          dice.style.transform = `rotateX(${this.baseX}deg) rotateY(${
           this.baseY
          }deg) scale(${this.initScale}) rotateZ(16deg)`;
          // console.log(dice.style.transform);
        };
        let up = e => {
          baseX = baseX - (((e.clientY - rotateY) / 10) % 360);
          baseY = baseY + (((e.clientX - rotateX) / 10) % 360);
          // console.log(baseX, baseY);
          document.removeEventListener('mousemove', move);
          document.removeEventListener('mouseup', up);
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
      });
      dice.onmousewheel =  (ev) =>{
        var ev = ev || window.event;
        var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
        down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
        if (down) {
          this.initScale =(this.initScale*100 - 0.02*100)/100

          if(this.initScale > 0){
            dice.style.transform = `rotateX(${this.baseX}deg) rotateY(${
              this.baseY
            }deg) scale(${this.initScale}) rotateZ(16deg)`;
          }

        } else {
          this.initScale = this.initScale + 0.02
            dice.style.transform = `rotateX(${this.baseX}deg) rotateY(${
              this.baseY
            }deg) scale(${this.initScale}) rotateZ(16deg)`;

        }
        if (ev.preventDefault) {/*FF 和 Chrome*/
          ev.preventDefault();// 阻止默认事件
        }
        return false;
      }
    }
  },
  data() {
    return {
      trackData: [{
        name:'toyoto',
        startX:0,
        startY:0,
        moveData:[
          {
            endX:100,
            endY:100
          }
        ]
      }],
      initScale:1,
      baseX:70,
      baseY:16
    };
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  position: relative;

  width: 844px;
  height: 582px;
  margin: 5px auto;
  background-color: rgba(204, 204, 204, 0.5);
  transform-style: preserve-3d;
  transform: rotateX(70deg) rotateZ(16deg);

  .box {
    position: absolute;
    width: 100px;
    height: 100px;
    -webkit-transform-style: preserve-3d; /* 表示所有子元素在3D空间呈现 */
    /* transform: rotateX(69deg) rotateY(17deg) ; /* 旋转正方体在空间中的位置及投影，前两个参数控制投影，第三个参数控制空间位置 */
    // -webkit-transform: rotateX(-9deg) rotateY(-10deg) rotateZ(0deg);

    transform: translateZ(50px);
    .origin {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      .plane {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(0, 0, 0, 1);
        background: #ccc;
        &:nth-child(1) {
          -webkit-transform: rotateX(0deg) translate3d(0px, 0px, 50px);
          background-color: red;
        }
        &:nth-child(2) {
          -webkit-transform: rotateX(-90deg) translate3d(0, 0, -50px);
          background-color: green;
        }
        &:nth-child(3) {
          -webkit-transform: rotateY(-90deg) translate3d(0, 0, 50px);
          background-color: yellow;
        }
        &:nth-child(4) {
          -webkit-transform: rotateY(0deg) translate3d(0, 0, -50px);
          background-color: aquamarine;
        }
        &:nth-child(5) {
          -webkit-transform: rotateX(90deg) translate3d(0, 0, -50px);
          background-color: rosybrown;
        }
        &:nth-child(6) {
          -webkit-transform: rotatey(-90deg) translate3d(0, 0, -50px);
          background-color: skyblue;
        }
      }
    }
  }
  .box1 {
    left: 200px;
    top: 200px;
  }
  .box2 {
    left: 600px;
    top: 200px;
  }
  .box3 {
    left: 1000px;
    top: 200px;
  }
  .box4 {
    left: 200px;
    top: 500px;
  }
  .box5 {
    left: 600px;
    top: 500px;
  }
  .box6 {
    left: 1000px;
    top: 500px;
  }
}
/* & video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(0);
} */
/* .container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
} */
</style>
