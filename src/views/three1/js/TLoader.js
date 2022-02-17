import * as THREE from "three";
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import {cuboid} from "./TBasicObject";
import {Mesh} from "three";
import {shadow} from "./TTextures";
// import a from 'three/examples/js/libs/draco/gltf/'
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/model/gltf/' );

const bodyMaterial = new THREE.MeshPhysicalMaterial( {
  color: 0xff0000, metalness: 0.6, roughness: 0.4, clearcoat: 0.05, clearcoatRoughness: 0.05
} );


const detailsMaterial = new THREE.MeshStandardMaterial( {
  color: 0xffffff, metalness: 1.0, roughness: 0.5
} );

const glassMaterial = new THREE.MeshPhysicalMaterial( {
  color: 0xffffff, metalness: 0, roughness: 0.1, transmission: 0.9, transparent: true
} );

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader( dracoLoader );
export let gltfPromise = new Promise((resolve,reject) => {
  gltfLoader.loadAsync('/model/glb/ferrari.glb').then(gltf => {
    let wheels = []
    let wheels2 = []
    const carModel = gltf.scene.children[ 0 ];
    let carModel2 = carModel.clone()
    let arr = [carModel,carModel2]
    arr.forEach( (v,index)=>{
      v.getObjectByName( 'body' ).material = new THREE.MeshPhysicalMaterial( {
        color: 0xff0000, metalness: 0.6, roughness: 0.4, clearcoat: 0.05, clearcoatRoughness: 0.05
      } );
      v.getObjectByName( 'rim_fl' ).material = new THREE.MeshStandardMaterial( {
        color: 0xffffff, metalness: 1.0, roughness: 0.5
      } );
      v.getObjectByName( 'rim_fr' ).material = new THREE.MeshStandardMaterial( {
        color: 0xffffff, metalness: 1.0, roughness: 0.5
      } );
      v.getObjectByName( 'rim_rr' ).material = new THREE.MeshStandardMaterial( {
        color: 0xffffff, metalness: 1.0, roughness: 0.5
      } );
      v.getObjectByName( 'rim_rl' ).material = new THREE.MeshStandardMaterial( {
        color: 0xffffff, metalness: 1.0, roughness: 0.5
      } );
      v.getObjectByName( 'trim' ).material = new THREE.MeshStandardMaterial( {
        color: 0xffffff, metalness: 1.0, roughness: 0.5
      } );
      v.getObjectByName( 'glass' ).material = new THREE.MeshPhysicalMaterial( {
        color: 0xffffff, metalness: 0, roughness: 0.1, transmission: 0.9, transparent: true
      } );
      index === 0 && wheels.push(
        v.getObjectByName( 'wheel_fl' ),
        v.getObjectByName( 'wheel_fr' ),
        v.getObjectByName( 'wheel_rl' ),
        v.getObjectByName( 'wheel_rr' )
      );
      index === 1 &&wheels2.push(
        v.getObjectByName( 'wheel_fl' ),
        v.getObjectByName( 'wheel_fr' ),
        v.getObjectByName( 'wheel_rl' ),
        v.getObjectByName( 'wheel_rr' )
      );
    })



    // const mesh = new Mesh(
    //   new THREE.PlaneGeometry( 0.655 * 4, 1.3 * 4 ),
    //   new THREE.MeshBasicMaterial( {
    //     map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
    //   } )
    // );
    // mesh.rotation.x = - Math.PI / 2;
    // mesh.renderOrder = 2;
    // carModel.add( mesh );
    resolve([carModel,wheels,carModel2,wheels2])
  })
})
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
