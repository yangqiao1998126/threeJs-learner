import {
  AmbientLight,
  AxesHelper,
  BoxBufferGeometry,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  MOUSE,
  Color,
  Object3D} from "three"

import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class TEngine {


  constructor (dom) {
    this.dom = dom
    this.renderer = new WebGLRenderer({
      antialias: true
    })

    this.renderer.shadowMap.enabled = true

    this.scene = new Scene()
    this.scene.background = new Color( 0xeeeeee );
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)

    this.camera.position.set(20, 20 ,20)
    this.camera.lookAt(new Vector3(0, 0, 0))
    this.camera.up = new Vector3(0, 1, 0)


    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)

    // 初始性能监视器
    const stats = Stats()
    const statsDom = stats.domElement
    statsDom.style.position = 'fixed'
    statsDom.style.top = '0'
    statsDom.style.right = '5px'
    statsDom.style.left = 'unset'

    // 初始orbitControls
    const orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    orbitControls.mouseButtons = {
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    }

    const renderFun = () => {
      orbitControls.update()

      this.renderer.render(this.scene, this.camera)
      stats.update()
      requestAnimationFrame(renderFun)
    }

    renderFun()

    dom.appendChild(this.renderer.domElement)
    dom.appendChild(statsDom)
  }

  addObject (...object) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}
