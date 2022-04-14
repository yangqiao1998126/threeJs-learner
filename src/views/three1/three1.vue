<template>
  <div style="height: 100%;position: absolute;top:0;bottom: 0;left: 0;right: 0;" class="three-canvas" ref="threeTarget"></div>
</template>

<script>
import {TEngine} from "./js/TEngine";
import {basicObjectList} from "./js/base/TBasicObject";
import {LightsList} from "./js/base/Tlights";
import {helperList} from "./js/base/THelper";
import {gltfPromise,fontModel} from "./js/loader/TLoader";
import {modelPromise} from "./js/loader/TLoader";
import Event from "./js/event/TObjectClick";

export default {
  name: "three1",
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      this.$loading1.show('模型加载场景构建中，请稍后...')
      window._event.once('model-loading-finished',_ => {
        // setTimeout(() => {
          this.$loading1.show('构建完成')
          this.$loading1.hide(100)
        // },300)
      })
      const TE = new TEngine(this.$refs.threeTarget)
      TE.addObject(...basicObjectList)
      TE.addObject(...LightsList)
      TE.addObject(...helperList)
    }
  },

}
</script>

<style scoped>
div{
  color: white;
}
</style>
