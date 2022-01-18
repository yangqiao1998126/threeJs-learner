import * as THREE from "three";
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
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
    fontModel.position.z = 45
    fontModel.position.x = -20
    fontModel.position.y = 5
    fontModel.scale.set(0.2,0.2,0.2)
    fontModel.castShadow = true
    fontModel.receiveShadow = true
    fontModel.name = 'three.js'
    resolve(fontModel)
  })
})
