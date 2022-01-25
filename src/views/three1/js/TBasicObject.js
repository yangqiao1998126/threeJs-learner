import * as THREE from 'three';
import {
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial,
  SphereBufferGeometry,
  CylinderBufferGeometry,
  Object3D,
  Line,
  Points,
  PointsMaterial,
  Material,
  PlaneBufferGeometry
} from 'three'
import {pictureTexture,shadow} from "./TTextures";

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
  // new MeshStandardMaterial({color: 'red'})


  //pbr材质 面粗糙度粗糙度
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

basicObjectList.push(stage, box,plane,mesh)
