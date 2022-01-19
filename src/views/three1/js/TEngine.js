import dat from "dat.gui/src/dat";
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
import {modelPromise} from "./TLoader";
import {spotLight,ambientLight} from "./Tlights";
import {pointLightHelper,spotLightHelper} from './THelper'
import Three1 from "../three1";

const modelObjs = {
  floorModel:{
    mtlUrl:'/model/obj/layout/layout.mtl',
    objUrl:'/model/obj/layout/layout.obj'
  }
}
//图形界面控制器
let gui = new dat.GUI()
let guiObj = {
  spotLightGui:{
    x:0,
    "聚光灯颜色":'#fff',
    "聚光灯强度":2,
  },
  ambientLightGui:{
    "环境光颜色":'#fff',
    "环境光强度":0.6,
  },
  "是否显示光源辅助线":true
}
gui.domElement.style="position:absolute;top:0px;left:0px"
gui.domElement.onclick = function (e){
  e.stopPropagation()
}
gui.add(guiObj,"是否显示光源辅助线")
let spotLightGui = gui.addFolder('聚合光')
spotLightGui.add(guiObj.spotLightGui,'x',-1000,1000)
spotLightGui.addColor(guiObj.spotLightGui,'聚光灯颜色')
spotLightGui.add(guiObj.spotLightGui,'聚光灯强度',0,2)

let ambientLightGui = gui.addFolder('环境光')
ambientLightGui.addColor(guiObj.ambientLightGui,'环境光颜色')
ambientLightGui.add(guiObj.ambientLightGui,'环境光强度',0,2)
export class TEngine {


  constructor (dom) {
    this.dom = dom
    this.renderer = new WebGLRenderer({
      antialias: true
    })

    this.renderer.shadowMap.enabled = true

    this.scene = new Scene()
    this.scene.background = new Color( 0,0,0 );
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)

    this.camera.position.set(20, 20 ,20)
    this.camera.lookAt(new Vector3(0, 0, 0))
    this.camera.up = new Vector3(0, 1, 0)


    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
    //自适应窗口
    this.resize()
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

    //加载obj模型
    const renderFun = () => {
      spotLight.position.x = guiObj.spotLightGui.x
      spotLight.intensity =  guiObj.spotLightGui['聚光灯强度']
      spotLight.color =  new Color(guiObj.spotLightGui['聚光灯颜色'])

      ambientLight.intensity =  guiObj.ambientLightGui['环境光强度']
      ambientLight.color =  new Color(guiObj.ambientLightGui['环境光颜色'])
      if(guiObj['是否显示光源辅助线']){
        spotLightHelper.visible = true
        pointLightHelper.visible = true
        // this.scene.add(spotLightHelper,pointLightHelper)
      }else{
        // console.log('false')
        // spotLightHelper.dispose()
        // pointLightHelper.dispose()
        spotLightHelper.visible = false
        pointLightHelper.visible = false
      }
      orbitControls.update()

      // if(window.modelPoint){
      //
      //   let position = this.getPosition(window.modelPoint)
      //   console.log(',,,,,,,,',position)
      //   window._event.emit('rePosition',position)
      // }
      this.renderer.render(this.scene, this.camera)
      this.composer.render()
      stats.update()
      requestAnimationFrame(renderFun)
    }

    renderFun()
    this.loadObjModel()

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
  getPosition(point){
    const halfWidth = window.innerWidth / 2
    const halfHeight = window.innerHeight / 2
    const vector1 = point.project(this.camera)
    return [vector1.x * halfWidth + halfWidth, -vector1.y * halfHeight + halfHeight]
  }
  resize(){
    window.addEventListener('resize',() => {
      this.camera.aspect = this.renderer.domElement.width/this.renderer.domElement.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight, true)
    },false)
  }
  loadObjModel(){
    modelPromise(modelObjs.floorModel).then(res => {
      console.log(res,'模型')
      res.children[0].name = ''
      this.scene.add(res)
      res.position.set(0,0,0)
      res.scale.set(0.2,0.2,0.2)
    })
  }
  addObject (...object) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}
