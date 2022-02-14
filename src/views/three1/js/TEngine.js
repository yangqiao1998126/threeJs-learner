import dat from "dat.gui/src/dat";
import 'dat.gui/src/dat/utils/css'
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
  Matrix4,
  Quaternion,
  Euler,
  Object3D} from "three"
import Event from "./TObjectClick";
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import {modelPromise} from "./TLoader";
import {spotLight,ambientLight} from "./Tlights";
import {pointLightHelper,spotLightHelper} from './THelper'
import {gltfPromise} from "./TLoader";
import Three1 from "../three1";
import scene from "three/examples/jsm/offscreen/scene";
import {curve} from "./TBasicObject";
const modelObjs = {
  floorModel:{
    mtlUrl:'/model/obj/layout/layout.mtl',
    objUrl:'/model/obj/layout/layout.obj'
  },
  tray1Model:{
    mtlUrl:'/model/obj/tray1/huojian.mtl',
    objUrl:'/model/obj/tray1/huojian.obj'
  },
  tray2Model:{
    mtlUrl:'/model/obj/tray2/2.mtl',
    objUrl:'/model/obj/tray2/2.obj'
  },
  shelf:{
    mtlUrl:'/model/obj/tray2/shelf.mtl',
    objUrl:'/model/obj/tray2/shelf.obj'
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
  carGui:{
    "速度":0,
    "轮胎旋转":false
  },
  car2Gui:{
    "速度":0,
    "路径循环":false,
    "第三视角跟随":false
  },
  "是否显示光源辅助线":true,
  "轨道控制器旋转":false
}
gui.domElement.style="position:absolute;top:0px;left:0px"
gui.domElement.onclick = function (e){
  e.stopPropagation()
}
gui.add(guiObj,"是否显示光源辅助线")
gui.add(guiObj,"轨道控制器旋转")
let spotLightGui = gui.addFolder('聚合光')
spotLightGui.add(guiObj.spotLightGui,'x',-1000,1000)
spotLightGui.addColor(guiObj.spotLightGui,'聚光灯颜色')
spotLightGui.add(guiObj.spotLightGui,'聚光灯强度',0,4)

let ambientLightGui = gui.addFolder('环境光')
ambientLightGui.addColor(guiObj.ambientLightGui,'环境光颜色')
ambientLightGui.add(guiObj.ambientLightGui,'环境光强度',0,2)

let carGui = gui.addFolder('车')
carGui.add(guiObj.carGui,'速度',{"停":0,"慢":0.03,"快":0.09})
carGui.add(guiObj.carGui,'轮胎旋转')

let carGui2 = gui.addFolder('沿路径运动')
carGui2.add(guiObj.car2Gui,"速度",{"停":0,"慢":0.0005,"快":0.001})
carGui2.add(guiObj.car2Gui,"路径循环")
carGui2.add(guiObj.car2Gui,"第三视角跟随")
let progress = 0
export class TEngine {


  constructor (dom) {
    this.dom = dom
    this.renderer = new WebGLRenderer({
      antialias: true
    })

    this.renderer.shadowMap.enabled = true

    this.scene = new Scene()
    this.scene.background = new Color( 0,0,0 );
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 20, 999)

    this.camera.position.set(-10, 60 ,100)
    // this.camera.position.set(130, 5 ,130)
    // this.camera.lookAt(130,0,0)
    // this.camera.up = new Vector3(0, 1, 0)


    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
    //自适应窗口
    this.resize()
    //初始线条渲染
    this.useEffectComposer()
    // 初始性能监视器ss
    const stats = Stats()
    const statsDom = stats.domElement
    statsDom.style.position = 'fixed'
    statsDom.style.top = '0'
    statsDom.style.right = '5px'
    statsDom.style.left = 'unset'

    // 初始orbitControls
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.orbitControls.mouseButtons = {
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    }
    // this.orbitControls.target = new Vector3(130,0,0)
    //加载obj模型
    const renderFun = () => {
      this.GUI()
      this.orbitControls.update()
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
    modelPromise(modelObjs.floorModel).then( async res => {
      res.children[0].name = ''
      this.scene.add(res)
      res.position.set(0,0,0)
      res.scale.set(0.2,0.2,0.2)

      let [carModel,wheel,carModel2,wheel2] =  await gltfPromise
      carModel.name = 'AE86'
      carModel.position.x = 45
      carModel.position.z = 45
      carModel.scale.set(6,6,6)
      carModel.children.forEach( v => {
        v.name = 'ferrari'+v.name
        if(v.children.length){
          v.children.forEach( o => {
            o.name = 'ferrari-'+o.name
          })
        }
      })
      this.car = [carModel,wheel,carModel2,wheel2]
      this.scene.add(carModel)
      carModel2.position.set(130,0,90)
      // carModel2.lookAt(130,0,80)
      carModel2.scale.set(6,6,6)
      // carModel2.rotateY(Math.PI)
      this.scene.add(carModel2)

      let tray1 = await modelPromise(modelObjs.tray1Model)
      tray1.name = "底盘1"
      tray1.position.set(-50,5,0)
      tray1.scale.set(3,3,3)
      this.scene.add(tray1)

      let tray2 = await modelPromise(modelObjs.tray2Model)
      tray2.name = "底盘2"
      tray2.position.set(-50,5,-20)
      tray2.scale.set(3,3,3)
      this.scene.add(tray2)

      let shelf = await modelPromise(modelObjs.shelf)
      shelf.name = "货架"
      shelf.position.set(-120,0,20)
      shelf.scale.set(150,150,150)
      this.scene.add(shelf)

      Event(this)
    })
  }

  GUI(){
    //光源相关GUI
    spotLight.position.x = guiObj.spotLightGui.x
    spotLight.intensity =  guiObj.spotLightGui['聚光灯强度']
    spotLight.color =  new Color(guiObj.spotLightGui['聚光灯颜色'])

    ambientLight.intensity =  guiObj.ambientLightGui['环境光强度']
    ambientLight.color =  new Color(guiObj.ambientLightGui['环境光颜色'])
    if(guiObj['是否显示光源辅助线']){
      spotLightHelper.visible = true
      pointLightHelper.visible = true
    }else{
      spotLightHelper.visible = false
      pointLightHelper.visible = false
    }
    //轨道
    if(guiObj['轨道控制器旋转']){this.orbitControls.autoRotate = true }else{this.orbitControls.autoRotate = false}

    let car = this.car&& this.car[0]
    let wheels = this.car&& this.car[1]
    const time = - performance.now();
    let _carPosition = _ => {
      if(guiObj.carGui["轮胎旋转"]){
        for ( let i = 0; i < wheels.length; i ++ ) {
          wheels[ i ].rotation.x = (time/_) * Math.PI;
        }
      }
      car.position.z -= guiObj.carGui["速度"]
    }
    let _car2Matrix4 = _ => {
      if(guiObj['car2Gui']['路径循环']){
        if(progress >=1) progress = 0;
      }
      progress += (guiObj['car2Gui']['速度']*1000/1000)
      // let point = _.getPoint((progress-guiObj['car2Gui']['速度']*2) >=0 ?progress-guiObj['car2Gui']['速度']*2:progress)
      let point = _.getPoint(progress)
      let point1 = _.getPoint(progress+guiObj['car2Gui']['速度']*2)
      let point2 = _.getPoint(progress+guiObj['car2Gui']['速度']*75)
      let offsetAngle = Math.PI*2
      let mtx = new Matrix4()
      mtx.lookAt(this.car[2].position.clone(),point2,this.car[2].up)
      mtx.multiply(new Matrix4().makeRotationFromEuler(new Euler(0, offsetAngle, 0)));
      let toRot = new Quaternion().setFromRotationMatrix(mtx);
      this.car[2].quaternion.slerp(toRot,0.2)
      this.car[2].position.set(point2.x,point2.y,point2.z)
      if(guiObj["car2Gui"]["第三视角跟随"]){
        this.camera.position.set(point.x,point.y+15,point.z)
        this.orbitControls.target = new Vector3(point1.x,point1.y+15,point1.z)
      }

    }
    if(car){
      switch (guiObj.carGui["速度"]){
        case 0:break;
        case 0.03:_carPosition(4500);break;
        default:_carPosition(2000);
      }
    }
    if(guiObj['car2Gui']['速度'] == 0){
    }else if(guiObj['car2Gui']['速度'] == 0.0005){
      curve &&  _car2Matrix4(curve)
    }else{
      curve &&  _car2Matrix4(curve)
    }

  }
  addObject (...object) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}
