<template>
  <div id="app">
    <router-view/>
    <section v-if="this.$route.path==='/three1'" class="infoContainer" @click.stop>
      <component v-bind:is="currentComponent" :_style="style" :desc="desc"></component>
      <div v-show="hidden" @click.stop class="dialog">
        <h2>{{ desc }}</h2>
        <div class="close" @click="hidden = false"></div>
      </div>

      <div ref="echartsContainer" :style="{left:isShowOpenIcon?'-30%':'0'}" class="echarts-container-left">
        <EchartsContainer :desc="desc"   @hideLeft="$refs.echartsContainer.style.left = '-30%';isShowOpenIcon = true"></EchartsContainer>
      </div>
      <img
        :style="{opacity:isShowOpenIcon?1:0,transition:'opacity .8s'}"
        class="open-left"
        src="https://wimg.588ku.com/gif620/21/10/06/27898bfbfd42320ae1e307db4b9e1b98.gif"
        alt=""
        @click="$refs.echartsContainer.style.left = '0';isShowOpenIcon = false"
      >
    </section>
  </div>
</template>
<script>
import tip from "./views/three1/components/tip";
import EchartsContainer from "./views/three1/components/EchartsContainer";

export default {
  name: 'app',
  data() {
    return {
      currentComponent: '',
      style: '',
      desc: '' || '默认值',
      hidden: false,
      position: '',
      isShowOpenIcon:true
    }
  },
  components: {
    EchartsContainer,
    tip
  },
  computed:{

  },
  mounted() {
    window._event.on('showTip', (name, position) => {
      if (name) {
        console.log(name, position)
        this.position = position
        this.style = `top:${position[1]}px;left:${position[0] + 20}px`
        this.desc = name
        this.hidden = true
        this.currentComponent = "tip"
        this.isShowOpenIcon && (this.isShowOpenIcon = false)
      } else {
        this.currentComponent = ''
        this.hidden = false
        this.position = ''
      }
    })
    window._event.on('rePosition', position => {
      if (this.currentComponent) {
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

.dialog {
  z-index: 10;
  text-align: center;
  padding-top: 35px;
  color: white;
  box-sizing: border-box;
  font-size: 14px;
  position: absolute;
  top: 40vh;
  left: 55%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  width: 600px;
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

  [class^="echarts-container"] {
    position: absolute;
    z-index: 100;
    width: 30%;
    padding: 5px 8px;
    box-sizing: border-box;
    //height: 100vh;
    background: rgba(0, 0, 0, 0.6);
  }

  .echarts-container-left {
    overflow-x: hidden;
    transition: all .6s;
    left: 0;

  }

  .open-left {
    z-index: 100;
    width: 70px;
    height: 50px;
    cursor: pointer;
    position: absolute;
    left: 0;
  }

  .echarts-container-right {
    right: 0;
  }

}
</style>
