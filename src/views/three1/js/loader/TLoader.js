import {Mesh, MeshLambertMaterial} from "three";
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/model/gltf/' );

const gltfLoader = new GLTFLoader()

gltfLoader.setDRACOLoader( dracoLoader );

export let Font = () => {
  return new FontLoader()
    .loadAsync('/model/STXingkai_Regular.json')
    .then(font => font)
}
export let fontModel = (font,text,size =3,color =0x282828 ) => {
  return new Mesh(new TextGeometry(text,{
    font,
    size,
    height:0.55
  }),new MeshLambertMaterial({color}))
}

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
