<template>
  <div style="height: 100%;position: absolute;top:0;bottom: 0;left: 0;right: 0;" class="three-canvas" ref="threeTarget"></div>
</template>

<script>
import {TEngine} from "./js/TEngine";
import {basicObjectList} from "./js/TBasicObject";
import {LightsList} from "./js/Tlights";
import {helperList} from "./js/THelper";
import {gltfPromise,fontModel} from "./js/TLoader";
import {modelPromise} from "./js/TLoader";
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
//       gltfPromise.then(res => {
//         console.log(res)
//         TE.scene.add(res[0])
//         res[0].position.x = 30
//         res[0].position.z = -9
//         res[0].scale.x = 5
//         res[0].scale.y = 5
//         res[0].scale.z = 5
// /*         const renderFun = () => {
//         // basicObjectList[1].position.x += -0.02
//         // basicObjectList[1].rotation.y += 0.001
//         // TE.camera.position.x += -0.01
//
//         const time = - performance.now() / 1000;
// 				for ( let i = 0; i < res[1].length; i ++ ) {
// 					res[1][ i ].rotation.x = time * Math.PI;
// 				}
//            res[0].position.z -=0.02
// 				// helperList[1].position.z = - ( time ) % 100;
//         TE.renderer.render(TE.scene, TE.camera)
//            TE.composer.render()
//         requestAnimationFrame(renderFun)
//       }
//
//       renderFun()*/
//
//       })
      fontModel.then(res => {
        TE.scene.add(res)
      })
      // modelPromise({
      //   mtlUrl:'/model/obj/layout/layout.mtl',
      //   objUrl:'/model/obj/layout/layout.mtl'
      // }).then(res => {
      //   console.log(res,'模型')
      //  TE.scene.add(res)
      //   res.position.set(0,0,0)
      //   res.scale.set(0.2,0.2,0.2)
      // })
      // Event(TE)

    }
  },

}
</script>

<style scoped>
div{
  color: white;
}
</style>
