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
  AnimationMixer,
  Euler,
  Group,
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
import {gltfPromise,gltfModelPromise} from "./TLoader";
import Three1 from "../three1";
import scene from "three/examples/jsm/offscreen/scene";
import {curve,curve1,curve2} from "./TBasicObject";
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
  },
  all:{
    mtlUrl:'/model/obj/all/a.mtl',
    objUrl:'/model/obj/all/a.obj'
  },
  horse:'/model/glb/Horse.glb',
  che:'/model/glb/untitled.glb',
  dipanrobo:'/model/glb/dipanrobo.glb',
  cangchuqu:'/model/glb/cangchuqu1.glb',
  xiaohw:'/model/glb/xiaohw.glb',
  huodun:'/model/glb/huodun.glb',
  chache:{
    mtlUrl:'/model/obj/chache/untitled.mtl',
    objUrl:'/model/obj/chache/untitled.obj',
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
let chacheProgress = 0
let prevTime = Date.now()
let isPoint = false
export class TEngine {
  xhwNum = 0

  constructor (dom) {
    this.isPlay = false
    this.huodunNum = 0
    this.xhwList = []
    this.xhwList1 = []
    this.dom = dom
    this.renderer = new WebGLRenderer({
      antialias: true
    })

    this.renderer.shadowMap.enabled = true

    this.scene = new Scene()
    this.scene.background = new Color( 0,0,0 );
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 20, 999)

    this.camera.position.set(-10, 60 ,100)



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
      if ( this.mixer ) {
        const time = Date.now();
        this.mixer.update( ( time - prevTime ) * 0.001 );
        prevTime = time;
      }
      this.orbitControls.update()
      this.handleXhw()
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


      let chache = await gltfModelPromise(modelObjs.che)
      chache = chache.scene
      this.chache = chache
      // chache.position.set(-210,3,30)
      chache.name = '叉车'
      chache.scale.set(1.2,1.2,1.2)
      // this.scene.add(chache)
      this.chache2 = chache.clone()
      this.chache2.position.set(-200,3,40)
      this.chache2.scale.set(1.2,1.2,1.2)
      this.scene.add(this.chache2)
      //货墩
      let huodun = (await gltfModelPromise(modelObjs.huodun)).scene
     this.huodun = huodun
      huodun.name = '货墩1'
      // huodun.position.set(-210,7,37)//货盘_Cube006
      huodun.scale.set(1,1.4,1)
      huodun.translateZ(7)
      huodun.translateY(4)

      let huodunInit = huodun.clone()
      huodunInit.name = '起始位置货墩'
      huodunInit.position.set(-216,3,35)
      this.scene.add(huodunInit)
      // this.scene.add(huodun)
      //获墩和叉车组合
      let chacheGroup = new Group()
      chacheGroup.add(this.chache)
      chacheGroup.add(huodun)
      this.chacheGroup = chacheGroup
      this.scene.add(chacheGroup)
      this.chacheGroup.position.x = -210
      this.chacheGroup.position.y = 3
      this.chacheGroup.position.z = 30

      let dipanboro = (await gltfModelPromise(modelObjs.dipanrobo)).scene
      dipanboro.position.set(-200,3,40)
      dipanboro.scale.set(2,2,2)
      this.scene.add(dipanboro)

      //单独货架仓储区
      let cangchuqu  = (await gltfModelPromise(modelObjs.cangchuqu)).scene
      cangchuqu.position.set(-135,0,-5)
      cangchuqu.scale.set(1.2,1.2,1.2)
      this.scene.add(cangchuqu)

      let horse = await gltfModelPromise(modelObjs.horse)
      let horsemodel = horse.scene.children[0]
      horsemodel.scale.set(0.2,0.2,0.2)
      horsemodel.position.set(110,0,-10)
      this.scene.add(horsemodel)
      this.mixer = new AnimationMixer(horsemodel)
      this.horseAction = this.mixer.clipAction(horse.animations[0])
        // this.action.setDuration(0.5).play()

      let csd1 = cangchuqu.getObjectByName('货盘029_Cube137_1')
      let csd2 = cangchuqu.getObjectByName('货盘029_Cube137_2')
      cangchuqu.getObjectByName('货盘030_Cube138_2').visible=false
      cangchuqu.getObjectByName('货盘030_Cube138_1').visible=false
      csd1.visible = false
      csd2.visible = false

      //传送带运动 相关小货物"
      let xhw = (await gltfModelPromise(modelObjs.xiaohw)).scene;
      xhw.name = `xhw${this.xhwNum}`
      xhw.position.set(-120,4.5,-36)
      xhw.scale.set(2,2,2)
      let endXhw = xhw.clone();endXhw.name = 'endXhw';this.scene.add(endXhw);endXhw.position.set(-120,0,37);endXhw.visible = false
      this.scene.add(xhw)
      this.xhwList.push(xhw)
      //传送带运动 相关小货物1"
      let xhw1 = (await gltfModelPromise(modelObjs.xiaohw)).scene;
      xhw1.name = `xhw1${this.xhwNum}`
      xhw1.position.set(-131,4.5,-36)//92
      xhw1.scale.set(2,2,2)
      let endXhw1 = xhw1.clone();endXhw1.name = 'endXhw1';endXhw1.position.set(-131,2,96);this.scene.add(endXhw1);endXhw1.visible= false
      this.scene.add(xhw1)
      this.xhwList1.push(xhw1)

      Event(this)
    })
  }
  handleXhw(){
    let endXhw = this.scene.getObjectByName('endXhw')
    for (let i = 0 ; i < this.xhwList.length ; i++) {
      if (this.xhwList[i] && this.xhwList[i].position) {
        if (this.xhwList[i].position.z > -24 && this.xhwList.length <= i + 1 && this.xhwList.length < 6) {
          let xhwClone = this.xhwList[0].clone()
          xhwClone.position.set(-120, 4.5, -36)
          xhwClone.name = `xhw${i + 1}`
          this.xhwList.push(xhwClone)
          console.log(this.xhwList);
          this.scene.add(xhwClone)
        } else {
          this.xhwList[i].position.z = ((this.xhwList[i].position.z * 100 + 0.06 * 100) / 100).toFixed(3) * 1
          if (this.xhwList[i].position.z > 34) {
            this.xhwList[i].position.z = -36
            endXhw.visible = true
            setTimeout(() => {
              endXhw.visible = false
            }, 800)
          }
        }
      }
    }

    let endXhw1 = this.scene.getObjectByName('endXhw1')
    for (let i = 0 ; i < this.xhwList1.length ; i++){
      if(this.xhwList1[i] && this.xhwList1[i].position){
        if(this.xhwList1[i].position.z > -14.5 && this.xhwList1.length <= i+1 && this.xhwList1.length <6){
          let xhwClone = this.xhwList1[0].clone()
          xhwClone.position.set(-131,4.5,-36)
          xhwClone.name = `xhw${i+1}`
          this.xhwList1.push(xhwClone)
         this.scene.add(xhwClone)
        }else{
          this.xhwList1[i].position.z = ((this.xhwList1[i].position.z*100 + 0.15*100)/100).toFixed(3)*1
          if( this.xhwList1[i].position.z > 92){
            this.xhwList1[i].position.z = -36
            endXhw1.visible = true
            setTimeout(() => { endXhw1.visible = false},800)
          }
        }
      }
    }
  }
  loadHuodun(){
    for(let i=0 ;i<this.huodunNum;i++){
      let hd = this.huodun.clone()
      hd.name = `获墩遍历生成${i}`
      if(this.scene.getObjectByName(`获墩遍历生成${i}`)){

      }else{
        hd.position.set(-120,6,(i)*6)
        this.scene.add(hd)
      }
    }
  }
  loadXhw(xhw){
    let xhwGroup = new Group()
    for (let i =0 ; i <5;i++){
      let xhwClone = xhw.clone()
      xhwClone.name = "xhw"+i
      xhwClone.position.z = i*3
      xhwGroup.add(xhwClone)
    }
    return xhwGroup
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
    //叉车
    if(this.isPlay){
      if(this.chache && this.chache2 && this.chacheGroup){
        if(chacheProgress >= 1) {chacheProgress =0 ;isPoint=false;this,this.huodunNum <=2 ? this.chacheGroup.add(this.huodun) :this.scene.remove(this.scene.getObjectByName('起始位置货墩'))};
        chacheProgress  = (chacheProgress*1000+0.003*1000)/1000
        let chachePoint = curve1.getPoint(chacheProgress)
        let {x,y,z} = chachePoint
        if(Math.abs(Math.abs(x).toFixed(3)-115) <=6 && Math.abs(Math.abs(z).toFixed(3)-0) <=4 && !isPoint && this.huodunNum <=2){
          isPoint = true
          this.isPlay = false
          console.log('到达指定位置了',)
          this.chacheGroup.remove(this.chacheGroup.getObjectByName('货墩1'))
          this.huodunNum +=1
          setTimeout(() => {
            this.isPlay = true
          },800)
        }else{
          let chachePoint1 = curve1.getPoint(chacheProgress+0.001*2)
          this.chacheGroup.lookAt(chachePoint1.x,chachePoint1.y,chachePoint1.z)
          // console.log(chachePoint.x,chachePoint.y,chachePoint.z)
          this.chacheGroup.position.set(chachePoint.x,chachePoint.y,chachePoint.z)

          let chachePoint2 = curve2.getPoint(chacheProgress)
          let chachePoint22 = curve2.getPoint(chacheProgress+0.001*2)
          this.chache2.lookAt(chachePoint22.x,chachePoint22.y,chachePoint22.z)
          this.chache2.position.set(chachePoint2.x,chachePoint2.y,chachePoint2.z)
        }

      }
    }
    this.loadHuodun()
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
