<template>
  <div id="app">
    <router-view />
    <section class="infoContainer" @click.stop>
      <component
        v-bind:is="currentComponent"
        :_style="style"
        :desc="desc"
      >

      </component>
      <div v-show="hidden" class="dialog">
        <h2 >{{desc}}</h2>
        <div class="close" @click="hidden = false"></div>
      </div>
    </section>
  </div>
</template>
<script>
import tip from "./views/three1/components/tip";
export default {
  name:'app',
  data(){
    return {
      currentComponent:'',
      style:'',
      desc:'',
      hidden:false,
      position :''
    }
  },
  components:{
    tip
  },
  mounted() {
    window._event.on('showTip',(name,position) => {
     if(name){
       console.log(name,position)
       this.position = position
       this.style = `top:${position[1]}px;left:${position[0] + 20}px`
       this.desc = name
       this.hidden = true
       this.currentComponent ="tip"
     }else{
       this.currentComponent = ''
       this.hidden = false
       this.position = ''
     }
    })
    window._event.on('rePosition',position => {
      if(this.currentComponent ){
        this.style = `top:${position[1]}px;left:${position[0] + 20}px`
        // if(this.position[0] == position[0] &&  this.position[1] == position[1]){
        //
        // }else{
        //
        // }


      }
    })
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #020308;
  overflow-y: auto;
}
* {
  margin: 0;
  padding: 0;
  ul,
  li {
    text-decoration: none;
  }
}
.dialog{
  text-align: center;padding-top: 35px;
  color: white;
  box-sizing: border-box;
  font-size: 14px;
  position: absolute;
  top: 40vh;
  left: 50%;
  transform: translate(-50%,-50%);
  margin: 0 auto;
  width: 640px;
  height: auto;
  min-height: 500px;
  background: url(./assets/main_bg.png) center/100% 100% no-repeat;
  .close {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 30px;
    top: 24px;
    background: url(./assets/close_normal.png) center/100% 100% no-repeat;
    &:hover {
      cursor: pointer;
      background: url(./assets/close_hover.png) center/100% 100% no-repeat;
    }
  }
}
.infoContainer {
  position: relative;
  height: 0;
  .test {
    position: absolute;
    top: 0;
    left: 300;
  }
}
</style>
