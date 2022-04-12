import * as THREE from 'three';
import {
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial,
  PlaneBufferGeometry
} from 'three'
import {pictureTexture} from "./TTextures";

export const basicObjectList = []

// 地面
const stage = new Mesh(
  new BoxBufferGeometry(200, 10, 200),
  new MeshStandardMaterial({color: 'rgb(0, 75, 75)'})
)
// stage.name = 'floor'
stage.castShadow = true
stage.receiveShadow = true
stage.position.y = -5

// 立方体
const box = new Mesh(
  new BoxBufferGeometry(20, 20, 20),
  new MeshStandardMaterial({
    color: 'red',
    // metalness: 1,
    roughness: 0.3
  })
)
box.name='Box1'
box.castShadow = true
box.receiveShadow = true
box.position.y = 10
box.position.x = -20

//长方体
export const cuboid = new Mesh(new BoxBufferGeometry(3,5,5),new THREE.MeshBasicMaterial( {color: "#fd5ffd",roughness: 0.3} ))
cuboid.castShadow = true
cuboid.receiveShadow = true
cuboid.position.set(130,0,90)

const plane = new Mesh(
  new PlaneBufferGeometry(192, 108),
  new MeshStandardMaterial({
    map: pictureTexture
  })
)
plane.name = '镁伽'
plane.position.y = 45
plane.scale.set(0.3, 0.3, 0.3)

//曲线
export const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(130,1,90),
  new THREE.Vector3(130,1,-120),
  new THREE.Vector3(-200,1,-120),
  new THREE.Vector3(-200,1,90),
  new THREE.Vector3(130,1,90),
  // new THREE.Vector3(130,1,-90),
  // new THREE.Vector3(0,1,90),
],false)
//管道缓冲几何体
const tubeGeometry = new THREE.TubeGeometry(curve,100,1,10,false)
const mesh = new THREE.Mesh(tubeGeometry,new THREE.MeshBasicMaterial({
  color:0x00ff00
}))
mesh.visible = false


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
const tubeGeometry1 = new THREE.TubeGeometry(curve1,100,1,5,false)
const line = new THREE.Mesh(tubeGeometry1,new THREE.MeshBasicMaterial({
  color:"#ffee33"
}))
line.visible = false

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
const tubeGeometry2 = new THREE.TubeGeometry(curve2,100,1,5,false)
const line2 = new THREE.Mesh(tubeGeometry2,new THREE.MeshBasicMaterial({
  color:"#ffee33"
}))
line2.visible = false
// mesh.visible = false
basicObjectList.push(mesh,line,line2)
