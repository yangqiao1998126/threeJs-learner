import * as THREE from 'three';
import {Mesh, MeshPhongMaterial, DoubleSide} from 'three'
import {tubeTexture} from "./TTextures";


export const curve1 = new THREE.CatmullRomCurve3([
  new THREE.Vector3(20,0,20),
  new THREE.Vector3(-8,0,20),
  new THREE.Vector3(-8,0,-105),
  new THREE.Vector3(200,0,-105),
  new THREE.Vector3(200,0,80),
  new THREE.Vector3(190,0,80),
  new THREE.Vector3(190,0,110),
  new THREE.Vector3(-8,0,110),
  new THREE.Vector3(20,0,20),
])
const tubeGeometry1 = new THREE.TubeGeometry(curve1,100,1.5,100,false)
export let tubeLine = tubeTexture.then(texture => {
  let tubeMaterial = new MeshPhongMaterial({
    map:texture,
    transparent:true,
    // color:0x47d8fa,
    side:DoubleSide
  })
  let lineMesh = new Mesh(tubeGeometry1,tubeMaterial)
  lineMesh.name = 'lineMesh'
  lineMesh.visible = false
  return lineMesh
})
// line.visible = false

export const curve2 = new THREE.CatmullRomCurve3([
  new THREE.Vector3(20,0,20),
  new THREE.Vector3(-8,0,110),
  new THREE.Vector3(190,0,110),
  new THREE.Vector3(190,0,80),
  new THREE.Vector3(200,0,80),
  new THREE.Vector3(200,0,-105),
  new THREE.Vector3(-8,0,-105),
  new THREE.Vector3(-8,0,20),
  new THREE.Vector3(20,0,20),
])


