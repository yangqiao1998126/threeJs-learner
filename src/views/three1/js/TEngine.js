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
import {spotLight,ambientLight,Dlight} from "./Tlights";
import {pointLightHelper,spotLightHelper,DLightHelper} from './THelper'
import {gltfPromise,gltfModelPromise} from "./TLoader";
import Three1 from "../three1";
import scene from "three/examples/jsm/offscreen/scene";
import {curve,curve1,curve2} from "./TBasicObject";
const modelObjs = {
  dimain:'/model/glb1/dimian.glb',
  cangchuqu:'/model/glb1/cangchuqu.glb',
  chache:'/model/glb1/chache.glb',
  longmenjia:'/model/glb1/longmenjia.glb',
  huodun:'/model/glb1/huodun.glb',
  tuopan:'/model/glb1/tuopan.glb',
  dipan:'/model/glb1/dipan.glb',
  huopinhe:'/model/glb1/huopinhe.glb',
  shebei1:'/model/glb1/shebei1.glb',
  shebei2:'/model/glb1/shebei2.glb',
  shebei3:'/model/glb1/shebei3.glb',
  shebei4:'/model/glb1/shebei4.glb',
  shebei5:'/model/glb1/shebei5.glb',
  shebei6:'/model/glb1/shebei6.glb',
  shebei7:'/model/glb1/shebei7.glb',
}
//图形界面控制器
let gui = new dat.GUI()
let guiObj = {
  spotLightGui:{
    // x:0,
    "平行光颜色":'#fff',
    "平行光强度":2,
  },
  ambientLightGui:{
    "环境光颜色":'#fff',
    "环境光强度":1.22,
  },
  "是否显示光源辅助线":true,
  // "轨道控制器旋转":false
}
gui.domElement.style="position:absolute;top:0px;left:0px"
gui.domElement.onclick = function (e){
  e.stopPropagation()
}
gui.add(guiObj,"是否显示光源辅助线")
let spotLightGui = gui.addFolder('平行光')
// spotLightGui.add(guiObj.spotLightGui,'x',-1000,1000)
spotLightGui.addColor(guiObj.spotLightGui,'平行光颜色')
spotLightGui.add(guiObj.spotLightGui,'平行光强度',0,4)

let ambientLightGui = gui.addFolder('环境光')
ambientLightGui.addColor(guiObj.ambientLightGui,'环境光颜色')
ambientLightGui.add(guiObj.ambientLightGui,'环境光强度',0,2)

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
      antialias: true,
      alpha:true
    })

    this.renderer.shadowMap.enabled = true

    this.scene = new Scene()
    this.scene.background = new Color( 200/255,200/255,200/255 );
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
      // if ( this.mixer ) {
      //   const time = Date.now();
      //   this.mixer.update( ( time - prevTime ) * 0.001 );
      //   prevTime = time;
      // }
      this.orbitControls.update()
      this.newXhwList0 && this.newXhwList0.length >0 &&this.handleXhw('xhwEnd0',this.newXhwList0,160,5,[184.5,4.2,93.5],[66,4.2,93.5])
      // this.handleXhw()
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
    gltfModelPromise(modelObjs.dimain).then( async res => {

      let dimian = res.scene
      dimian.position.set(0,0,0)
      dimian.scale.set(1.6,2,1)
      this.scene.add(dimian)

      let cangchuqu = (await gltfModelPromise(modelObjs.cangchuqu)).scene
      cangchuqu.position.set(160,0,0)
      cangchuqu.scale.set(1.4,1.4,1.4)
      cangchuqu.rotateY(-Math.PI/2)
      this.scene.add(cangchuqu)

      let chache = (await gltfModelPromise(modelObjs.chache)).scene
      // chache.position.set(20,0,20)
      chache.scale.set(1.1,1.1,1.1)
      this.chache = chache
      this.chache2 = chache.clone()
      this.chache2.position.set(20,0,0)
      this.scene.add(this.chache2)

      let longmenjia = (await gltfModelPromise(modelObjs.longmenjia)).scene
      longmenjia.position.set(100,0,0)
      longmenjia.scale.set(1.1,1.1,1.1)
      longmenjia.rotateY(-Math.PI/2)
      this.scene.add(longmenjia)

      let huodun = (await gltfModelPromise(modelObjs.huodun)).scene
      let huodun1 = huodun.clone()
      huodun1.position.set(20,0,35)
      this.scene.add(huodun1)

      //获墩和叉车组合
      let chacheGroup = new Group()
      chacheGroup.add(this.chache)
      chacheGroup.add(huodun)
      this.chacheGroup = chacheGroup
      huodun.translateZ(7)
      huodun.translateY(1)
      huodun.name = '货墩1'
      this.huodun = huodun
      this.scene.add(chacheGroup)
      this.chacheGroup.position.x = 20
      this.chacheGroup.position.y = 0
      this.chacheGroup.position.z = 20

      let tuopan = (await gltfModelPromise(modelObjs.tuopan)).scene
      tuopan.position.set(20,0,42)
      tuopan.scale.set(1.1,1.1,1.1)
      this.scene.add(tuopan)

      let dipan = (await gltfModelPromise(modelObjs.dipan)).scene
      dipan.position.set(20,0,47)
      dipan.scale.set(1.1,1.1,1.1)
      dipan.rotateY(-Math.PI/2)
      this.scene.add(dipan)

      let huopinhe = (await gltfModelPromise(modelObjs.huopinhe)).scene
      huopinhe.position.set(20,0,51)
      huopinhe.scale.set(1.1,1.1,1.1)
      huopinhe.rotateY(-Math.PI/2)
      this.scene.add(huopinhe)
      //传送带 货品和相关
      let xhwEndList = [[ [184.5,4.2,93.5],[61,0,93.5] ],]
      //1. [184.5,4.2,93.5],[66,4.2,93.5],[61,0,93.5]
      for(let i = 0;i<xhwEndList.length;i++){
        let arr = []
        let xhwClone = huopinhe.clone()
        let endClone = huopinhe.clone()
        let [x,y,z] = xhwEndList[i][1]
        let [x1,y1,z1] = xhwEndList[i][0]
        endClone.scale.set(1.8,1.8,1.8)
        xhwClone.scale.set(1.8,1.8,1.8)
        endClone.position.set(x,y,z)
        xhwClone.position.set(x1,y1,z1)
        endClone.name = 'xhwEnd'+i
        this.scene.add(endClone)
        this.scene.add(xhwClone)
        endClone.visible = false
        arr.push(xhwClone)
        this[`newXhwList${i}`] = [...arr]
      }
      Event(this)
    })
  }

  handleXhw(endXhwName,xhwList,distance,num,[x,y,z],endPosition){
    let endXhw = this.scene.getObjectByName(endXhwName)
    for (let i = 0 ; i < xhwList.length ; i++) {
      if (xhwList[i] && xhwList[i].position) {
        if (xhwList[i].position.x < distance && xhwList.length <= i + 1 && xhwList.length < num) {
          let xhwClone = xhwList[0].clone()
          xhwClone.position.set(x, y,z)
          xhwClone.name = `xhw${i + 1}`
          xhwList.push(xhwClone)
          console.log(xhwList);
          this.scene.add(xhwClone)
        } else {
          xhwList[i].position.x = ((xhwList[i].position.x * 100 - 0.06 * 100) / 100).toFixed(3) * 1
          if (xhwList[i].position.x < endPosition[0]) {
            xhwList[i].position.x = x
            endXhw.visible = true
            setTimeout(() => {
              endXhw.visible = false
            }, 800)
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
        hd.position.set(185,0,100+i*5)
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
    // spotLight.position.x = guiObj.spotLightGui.x
    Dlight.intensity =  guiObj.spotLightGui['平行光强度']
    Dlight.color =  new Color(guiObj.spotLightGui['平行光颜色'])

    ambientLight.intensity =  guiObj.ambientLightGui['环境光强度']
    ambientLight.color =  new Color(guiObj.ambientLightGui['环境光颜色'])
    if(guiObj['是否显示光源辅助线']){
      DLightHelper.visible = true
      pointLightHelper.visible = true
    }else{
      DLightHelper.visible = false
      pointLightHelper.visible = false
    }
    //轨道


    //叉车
    if(this.isPlay){
      if(this.chache && this.chache2 && this.chacheGroup){
        if(chacheProgress >= 1) {chacheProgress =0 ;isPoint=false;this.huodunNum <=2 ? this.chacheGroup.add(this.huodun) :''};
        // if(chacheProgress >= 1) {chacheProgress =0 ;isPoint=false};
        chacheProgress  = (chacheProgress*1000+0.003*1000)/1000
        let chachePoint = curve1.getPoint(chacheProgress)
        let {x,y,z} = chachePoint
        if(Math.abs(Math.abs(x).toFixed(3)-190) <=6 && Math.abs(Math.abs(z).toFixed(3)-100) <=4 && !isPoint && this.huodunNum <=2){
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


  }
  addObject (...object) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}
