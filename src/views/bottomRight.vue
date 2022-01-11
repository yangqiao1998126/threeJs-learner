<!--
<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">工单修复以及满意度统计图</span>
          <div class="decoration2">
            <dv-decoration-2 :reverse="true" style="width:5px;height:6rem;" />
          </div>
        </div>
      </div>
      <div  style="width: 912px;height: 480px">
&lt;!&ndash;        <BottomRightChart />&ndash;&gt;
        <canvas ref="canvas" width="912px" height="500px"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import BottomRightChart from "@/components/echart/bottom/bottomRightChart";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BottomRightChart
  },
  mounted() {
    // this.$nextTick(() => {
      this.initLine()
    // })
  },
  methods:{
    initLine(){
      let canvas = this.$refs.canvas
      let data = [
        [ [20,20],[20,50],[50,50],[50,400],[100,400],[100,20]],
        [ [150,20],[150,200],[200,200],[200,100],[300,100],[300,220],[450,220],[450,50],[900,50]],
        [ [900,300],[820,300],[820,250],[700,250],[700,350],[550,350],[550,280],[150,280]]
      ]
      if(canvas.getContext){
        let ctx = canvas.getContext("2d");

        drawNotChange(ctx);
        setInterval(function(){
          run(ctx);
        }, 1000);
        //画⚪
        /*let obj = {}
        data.forEach( (v,i) => {
          obj[i] = v
          v.forEach( (v2,index) => {
            let initX
            let initY
            if(index === 0){
              initX = v2[0]
              initY = v2[1]
              drawRect(ctx,initX,initY)
            }else{
              console.log(initX)
              // initX = v2[0] - initX

            }
          })
        })*/
        function drawNotChange(ctx){
          // ctx.fillStyle='red';
          // ctx.beginPath();
          // ctx.arc(500,400,30,0,2*Math.PI,true);
          // ctx.closePath();
          // ctx.fill();
          ctx.strokeStyle="#FF9933";
          ctx.lineWidth=4;
          ctx.beginPath();
          ctx.arc(600,300,150,0,2*Math.PI,true);
          ctx.closePath();
          ctx.stroke();
          ctx.strokeStyle="#FF9933";
          ctx.lineWidth=4;
          ctx.lineCap="round";
          data.forEach(v => {
            ctx.beginPath();
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
        }
        var time=0;//定义运动的执行次数
        function run(cxt){

          cxt.clearRect(0,0,1024,728);
          drawNotChange(cxt);
          cxt.save();//将当前以左上角坐标为(0,0)的上下文环境进行保存，这样是为了在接下来中要进行画布偏移后，可以进行还原当前的环境
          cxt.translate(600,300);
          cxt.rotate(time*8*Math.PI/180);//设定每次旋转的度数
          cxt.fillStyle='blue';
          cxt.beginPath();
          cxt.arc(0,150,30,0,2*Math.PI,false);
          cxt.closePath();
          cxt.fill();
          cxt.restore();//将当前为(500,400)的点还原为（0,0）,其实在save中就是将上下文环境保存到栈中，在restore下面对其进行还原
          time+=1;
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

      }
    }
  }
};
</script>

<style lang="scss" class>
$box-height: 520px;
$box-width: 100%;
#bottomRight {
  padding: 14px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
  }
  .chart-box {
    margin-top: 16px;
    width: 170px;
    height: 170px;
    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>
-->
<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">工单修复以及满意度统计图</span>
          <div class="decoration2">
            <dv-decoration-2 :reverse="true" style="width:5px;height:6rem;" />
          </div>
        </div>
      </div>
      <div  style="width: 912px;height: 480px">
        <!--        <BottomRightChart />-->
<!--        <div id="trans3DDemo1">-->
<!--          <div id="trans3DBoxes1">-->
<!--            <div class="a1">Front</div>-->
<!--            <div class="a2">Left</div>-->
<!--            <div class="a3">Right</div>-->
<!--            <div class="a4">Top</div>-->
<!--            <div class="a5">Bottom</div>-->
<!--            <div class="a6">Back</div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <test></test>-->
        <Home></Home>
      </div>
    </div>
  </div>
</template>

<script>
import BottomRightChart from "@/components/echart/bottom/bottomRightChart";
import test from "./test";
import Home from "./Home";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BottomRightChart,
    test,
    Home
  },
  mounted() {
  },
  methods:{
  }
};
</script>

<style lang="scss" class>
$box-height: 520px;
$box-width: 100%;
#bottomRight {
  padding: 14px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
  }
  .chart-box {
    margin-top: 16px;
    width: 170px;
    height: 170px;
    .active-ring-name {
      padding-top: 10px;
    }
  }
}
#trans3DDemo1 {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 250px;
  top: 100px;
  left: 20%;
}

#trans3DBoxes1 {
  transform-style: preserve-3d;
  perspective: 3000px;
  transform: translate(120px) rotate3d(1, 1, 1, -41deg);
}

#trans3DBoxes1 div {
  position: absolute;
  width: 248px;
  height: 248px;
  padding: 0;
  margin: 0;
  border: 1px solid rgba(255, 255, 255, .2);
  display: block;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}

.a1 {
  background: rgb(148, 141, 131);
  opacity: 0.85;
  transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,125,1);
  //或者
  //translate3d(0px, 0px, 125px)

}

.a2 {
  background: rgb(10, 59, 110);
  opacity: 0.85;
  transform: matrix3d(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, -125, 0, 0, 1);
  //或者
  //translate3d(-125px, 0px, 0px) rotate3d(0, 1, 0, -90deg)
}

.a3 {
  background: rgb(70, 179, 24);
  opacity: 0.85;
  transform: matrix3d(0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 125, 0, 0, 1);
  //或者
  //translate3d(125px, 0px, 0px) rotate3d(0, 1, 0, 90deg)
}

.a4 {
  background: rgb(237, 190, 2);
  opacity: 0.85;
  transform: matrix3d(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, -125, 0, 1);
  //或者
  //translate3d(0, -125px, 0) rotate3d(1, 0, 0, 90deg)
}

.a5 {
  background: rgb(199, 118, 19);
  opacity: 0.85;
  transform: matrix3d(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 125, 0, 1);
}

.a6 {
  background: rgb(184, 33, 36);
  opacity: 0.85;
  transform: matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, -125, 1);
}

</style>
