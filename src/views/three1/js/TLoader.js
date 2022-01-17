import * as THREE from "three";
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {Mesh} from "_three@0.133.1@three";
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
    const carModel = gltf.scene.children[ 0 ];

    carModel.getObjectByName( 'body' ).material = bodyMaterial;

    carModel.getObjectByName( 'rim_fl' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_fr' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_rr' ).material = detailsMaterial;
    carModel.getObjectByName( 'rim_rl' ).material = detailsMaterial;
    carModel.getObjectByName( 'trim' ).material = detailsMaterial;

    carModel.getObjectByName( 'glass' ).material = glassMaterial;

    wheels.push(
      carModel.getObjectByName( 'wheel_fl' ),
      carModel.getObjectByName( 'wheel_fr' ),
      carModel.getObjectByName( 'wheel_rl' ),
      carModel.getObjectByName( 'wheel_rr' )
    );
    const mesh = new Mesh(
      new THREE.PlaneGeometry( 0.655 * 4, 1.3 * 4 ),
      new THREE.MeshBasicMaterial( {
        map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
      } )
    );
    mesh.rotation.x = - Math.PI / 2;
    mesh.renderOrder = 2;
    carModel.add( mesh );
    resolve([carModel,wheels])
  })
})
