import {CylinderGeometry, DoubleSide, Mesh, MeshBasicMaterial} from "three";
import {cylinderTexture} from "../base/TTextures";

let cylinder = (radius, height) => new CylinderGeometry(radius, radius, height, 64)
let cylinderMaterials = url => {
  return cylinderTexture(url).then(res => {
    return [
      new MeshBasicMaterial({map: res, side: DoubleSide, transparent: true}),
      new MeshBasicMaterial({transparent: true, opacity: 0, side: DoubleSide}),
      new MeshBasicMaterial({transparent: true, opacity: 0, side: DoubleSide})
    ]
  })
}

export class Aperture {
  static apertureList = []
  cylinderRadius = 0
  cylinderOpacity = 1

  constructor(engine, radius, height,[x,y,z], changeRad = 0.06, changeOPc = 0.015, url = '/img/t2.jpeg',) {
    cylinderMaterials(url).then(material => {
      let cylinderMesh = new Mesh(cylinder(radius, height), material)
      this.name = cylinderMesh.name = `cylinderMesh${Aperture.apertureList.length}`
      cylinderMesh.position.set(x,y,z)
      this.cylinderMesh = cylinderMesh
      Aperture.apertureList.push(this)
      engine.apertureList = [...Aperture.apertureList]
      this.scene = engine.scene
      this.scene.add(this.cylinderMesh)
      this.radius = radius
      this.changeRad = changeRad
      this.changeOPc = changeOPc
    })
  }

  changeMaterial() {
    if (this.scene.getObjectByName(this.name)) {
      this.cylinderRadius += this.changeRad
      this.cylinderOpacity -= this.changeOPc
      if (this.cylinderRadius > this.radius) {
        this.cylinderRadius = 0
        this.cylinderOpacity = 1
      }
      this.cylinderMesh.scale.set(1 + this.cylinderRadius, 1, 1 + this.cylinderRadius); //圆柱半径增大
      this.cylinderMesh.material[0].opacity = this.cylinderOpacity;
    }
  }
}
