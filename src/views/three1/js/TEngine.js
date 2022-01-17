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
  Vector2,
  WebGLRenderer,
  MOUSE,
  Color,
  Object3D} from "three"

import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'


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
    //初始线条渲染
    this.useEffectComposer()
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
      this.composer.render()
      stats.update()
      requestAnimationFrame(renderFun)
    }

    renderFun()

    dom.appendChild(this.renderer.domElement)
    dom.appendChild(statsDom)
  }
  useEffectComposer(){
    const composer = new EffectComposer(this.renderer);
    this.composer = composer
    const renderPass = new RenderPass(this.scene, this.camera);
    composer.addPass(renderPass) //将传入的过程添加到过程链。

    const outlinePass = new OutlinePass( //线条渲染
      new Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera
    );
    outlinePass.visibleEdgeColor.set('#00a426')
    outlinePass.hiddenEdgeColor.set('#4d4542')
    outlinePass.edgeStrength = 5
    outlinePass.edgeGlow = 1
    outlinePass.edgeThickness = 1
    outlinePass.pulsePeriod = 1
    this.outlinePass = outlinePass
    composer.addPass(outlinePass)
  }
  addObject (...object) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}
