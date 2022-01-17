<template>
  <div style="height: 100%;position: absolute;top:0;bottom: 0;left: 0;right: 0;" class="three-canvas" ref="threeTarget"></div>
</template>

<script>
import {TEngine} from "./js/TEngine";
import {basicObjectList} from "./js/TBasicObject";
import {LightsList} from "./js/Tlights";
import {helperList} from "./js/THelper";
import {gltfPromise} from "./js/TLoader";
import Event from "./js/TObjectClick";

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
      const TE = new TEngine(this.$refs.threeTarget)
      TE.addObject(...basicObjectList)
      TE.addObject(...LightsList)
      TE.addObject(...helperList)
      gltfPromise.then(res => {
        console.log(res)
        TE.scene.add(res[0])
        res[0].position.x = 20
        res[0].position.z = -5
        res[0].scale.x = 5
        res[0].scale.y = 5
        res[0].scale.z = 5
/*         const renderFun = () => {
        // basicObjectList[1].position.x += -0.02
        // basicObjectList[1].rotation.y += 0.001
        // TE.camera.position.x += -0.01

        const time = - performance.now() / 1000;
				for ( let i = 0; i < res[1].length; i ++ ) {
					res[1][ i ].rotation.x = time * Math.PI;
				}
           res[0].position.z -=0.02
				// helperList[1].position.z = - ( time ) % 100;
        TE.renderer.render(TE.scene, TE.camera)
           TE.composer.render()
        requestAnimationFrame(renderFun)
      }

      renderFun()*/

      })
      Event(TE)

    }
  },

}
</script>

<style scoped>
div{
  color: white;
}
</style>
