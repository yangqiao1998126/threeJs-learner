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
    }
  },
  components:{
    tip
  },
  mounted() {
    console.log(window._event);
    window._event.on('showTip',(name,position) => {
     if(name){
       console.log(name,position)
       this.style = `top:${position[1]}px;left:${position[0] + 20}px`
       this.desc = name
       this.currentComponent ="tip"
     }else{
       this.currentComponent = ''
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
