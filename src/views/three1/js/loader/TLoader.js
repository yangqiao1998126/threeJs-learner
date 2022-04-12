import * as THREE from "three";
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/model/gltf/' );

const gltfLoader = new GLTFLoader()

gltfLoader.setDRACOLoader( dracoLoader );

export let fontModel = new Promise((resolve,reject) => {
  new FontLoader().loadAsync('/model/font.json').then(font => {
    let geometry = new TextGeometry( 'three.js', {
      font: font,
      size: 50,
      height: 20,
      // curveSegments: 20,
      // bevelEnabled: true,
      // bevelThickness: 8,
      // bevelSize: 6,
      // bevelSegments: 4
    } );
    let fontMaterial = new THREE.MeshLambertMaterial({
      color: '#f3f3f3'
    });

    let fontModel = new THREE.Mesh(geometry,fontMaterial);
    fontModel.position.z = 85
    fontModel.position.x = -75
    fontModel.position.y = 5
    fontModel.rotateY(1/6*Math.PI)
    fontModel.scale.set(0.15,0.15,0.15)
    fontModel.castShadow = true
    fontModel.receiveShadow = true
    fontModel.name = ''
    resolve(fontModel)
  })
})

//加载gltf模型
export let gltfModelPromise = (url) => {
  return new Promise((reslove,reject) => {
    gltfLoader.loadAsync(url).then(gltf => {
      gltf.scene.traverse( (child) => {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material && (child.material.side = 0)
      } );
      reslove(gltf)
    })
  })

}




//加载模型
// import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
export const modelPromise = ({mtlUrl,objUrl} = {}) => {
  const objLoader = new OBJLoader()
  const mtlLoader = new MTLLoader()
  return new Promise(resolve => {
    mtlLoader.loadAsync(mtlUrl)
      .then(materialCreator => {
      objLoader
        .setMaterials(materialCreator)
        .loadAsync(objUrl)
        .then(res => {
          resolve(res)
        })
    })
  })

  // let objLoader = new OBJLoader() //obj加载器
  // let mtlLoader = new MTLLoader() //材质文件let
  // return new Promise(res => {
  //   this.mtlLoader.load(`${obj.mtlUrl}`, materials => {
  //     this.objLoader.setMaterials(materials)
  //     this.objLoader.load(
  //       `${path}.obj`,
  //       obj => {
  //         obj.scale.set(
  //           scale || Config.obj.globalScale,
  //           scale || Config.obj.globalScale,
  //           scale || Config.obj.globalScale
  //         )
  //         this.self.scene.add(obj)
  //         obj.userData.childName = childName
  //         obj.userData.level = level
  //         this.self.setCastShadowAndReceiveShadow(obj)
  //         window.__HMF__[path] = obj
  //         res(obj)
  //       },
  //       xhr => {
  //         if (xhr.lengthComputable) {
  //           var percentComplete = (xhr.loaded / xhr.total) * 100
  //           // console.log('loading...', percentComplete.toFixed(1))
  //         }
  //       }
  //     )
  //   })
  // })
}
