import dat from "dat.gui/src/dat";
import 'dat.gui/src/dat/utils/css'

// import Refractor from 'three/examples/js/objects/Refractor';
// import WaterRefractionShader from 'three/examples/js/shaders/WaterRefractionShader';

import {AmbientLight,
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
  CubeTextureLoader,
  Euler,
  PlaneBufferGeometry,
  MeshPhysicalMaterial,
  MeshBasicMaterial,
  DoubleSide,
  Group,
  Object3D} from "three"
import Event from "./TObjectClick";
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { SSAARenderPass} from 'three/examples/jsm/postprocessing/SSAARenderPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
// import "three/examples/js/objects/Refractor"
// import  'three/examples/js/shaders/WaterRefractionShader';
import {modelPromise} from "./TLoader";
import {spotLight,ambientLight,Dlight} from "./Tlights";
import {pointLightHelper,spotLightHelper,DLightHelper} from './THelper'
import {gltfPromise,gltfModelPromise} from "./TLoader";
import Three1 from "../three1";
import scene from "three/examples/jsm/offscreen/scene";
import {curve,curve1,curve2} from "./TBasicObject";
import {loadModelFun} from "./loadModel";
import TWEEN from "@tweenjs/tween.js";
const modelObjs = {
  dimain:'/model/glb1/dimian.glb',
  "zhoubianjianzhu":'/model/glb1/zhoubianjianzhu.glb',
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
  suodao:'/model/glb1/suodao.glb',
  wenjiangui2:'/model/glb1/wenjiangui2.glb',
  low_building_1:{
    mtlUrl:'/model/obj/low_building_1/low_building_1.mtl',
    objUrl:'/model/obj/low_building_1/low_building_1.obj'
  },
  low_building_2:{
    mtlUrl:'/model/obj/low_building_2/low_building_2.mtl',
    objUrl:'/model/obj/low_building_2/low_building_2.obj'
  }
}
//图形界面控制器
let gui = new dat.GUI()
let guiObj = {
  spotLightGui:{
    // x:0,
    "平行光颜色":'#fff',
    "平行光强度":1.1,
  },
  ambientLightGui:{
    "环境光颜色":'#fff',
    "环境光强度":1.22,
  },
  "是否显示光源辅助线":true,
  "抗锯齿Level":1
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
gui.add(guiObj,'抗锯齿Level',{
  'Level 0': 0,
  'Level 1': 1,
  'Level 2': 2,
  'Level 3': 3,
  'Level 4': 4,
  'Level 5': 5
})

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
      // alpha:true
    })
    this.renderer.shadowMap.enabled = true
    // this.renderer.shadowMapEnabled = true
    // this.renderer.setPixelRatio(window.devicePixelRatio < 1.5 ? 1.5 : window.devicePixelRatio)
    // this.renderer.antialias = true
    this.scene = new Scene()
    var path = "http://ae01.alicdn.com/kf/";       //设置路径
    var format = '.jpg';                        //设定格式
    var urls = [
      path + 'HTB1GBRUhpooBKNjSZFPq6xa2XXa5'+ format,
      path + 'HTB1nqDXm98YBeNkSnb4q6yevFXa0'+ format,
      path + 'HTB13tL9vkOWBuNjSsppq6xPgpXay' + format,
      path + 'HTB1VELXvgaTBuNjSszfq6xgfpXac' + format,
      path + 'HTB1PLbTvf9TBuNjy1zbq6xpepXao' + format,
      path + 'HTB1bxWzmZuYBuNkSmRyq6AA3pXa8' + format
      // 'https://wow.techbrood.com/uploads/1909/sky.jpg',
      // 'https://wow.techbrood.com/uploads/1909/sky.jpg',
      // 'https://wow.techbrood.com/uploads/1909/sky.jpg',
      // 'https://wow.techbrood.com/uploads/1909/sky.jpg',
      // 'https://wow.techbrood.com/uploads/1909/sky.jpg',
      // 'https://wow.techbrood.com/uploads/1909/sky.jpg',
    ];
   this.textureCube = new CubeTextureLoader().load( urls );
    // this.scene.background = textureCube
    this.scene.background = new Color( 200/255,200/255,200/255 );
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 5, 1855)
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
    this.orbitControls.maxDistance = 600
    this.orbitControls.maxZoom = 600
    this.orbitControls.maxZoom = 10
    this.orbitControls.maxPolarAngle = Math.PI/2.2
    //加载obj模型
    const renderFun = () => {
      this.GUI()
      // if ( this.mixer ) {
      //   const time = Date.now();
      //   this.mixer.update( ( time - prevTime ) * 0.001 );
      //   prevTime = time;
      // }
      this.isPlay && (
      this.newXhwList0 && this.newXhwList0.length >0 &&this.handleXhw('xhwEnd0',this.newXhwList0,160,5,[184.5,4.2,93.5],[66,4.2,93.5]),
      this.newXhwList1 && this.newXhwList1.length >0 &&this.handleXhw('xhwEnd1',this.newXhwList1,167,10,[184.5,4.2,80.8],[9,4.2,80.8],0.2),
      this.newXhwList2 && this.newXhwList2.length >0 &&this.handleXhw('xhwEnd2',this.newXhwList2,-36,7,[-26,4,20.5],[-97,4,20.5],0.15),
      this.newXhwList3 && this.newXhwList3.length >0 &&this.handleXhw('xhwEnd3',this.newXhwList3,-40.2,5,[-26,4,-69.3],[-97,4,-69.3],0.11)
      )
      this.orbitControls.update()
      // this.handleXhw()
      // if(window.modelPoint){
      //   let position = this.getPosition(window.modelPoint)
      //   console.log(',,,,,,,,',position)
      //   window._event.emit('rePosition',position)
      // }
      // this.renderer.render(this.scene, this.camera)
      this.renderPass.sampleLevel = guiObj['抗锯齿Level']
      this.composer.render()
      stats.update()
      // TWEEN.update()
      requestAnimationFrame(renderFun)
    }
    renderFun()
    this.loadObjModel()
    dom.appendChild(this.renderer.domElement)
    dom.appendChild(statsDom)
  }
  useEffectComposer(){
    const composer = new EffectComposer(this.renderer);
    composer.setPixelRatio(1)
    this.composer = composer
     this.renderPass = new SSAARenderPass(this.scene, this.camera);
    composer.addPass(this.renderPass) //将传入的过程添加到过程链。



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
    gltfModelPromise(modelObjs.zhoubianjianzhu).then(loadModelFun.call(this,modelObjs))
  }
  handleXhw(endXhwName,xhwList,distance,num,[x,y,z],endPosition,speed=0.06){
    let endXhw = this.scene.getObjectByName(endXhwName)
    for (let i = 0 ; i < xhwList.length ; i++) {
      if (xhwList[i] && xhwList[i].position) {
        if (xhwList[i].position.x < distance && xhwList.length <= i + 1 && xhwList.length < num) {
          let xhwClone = xhwList[0].clone()
          xhwClone.position.set(x, y,z)
          xhwClone.name = `xhw${i + 1}`
          xhwList.push(xhwClone)
          this.scene.add(xhwClone)
        } else {
          xhwList[i].position.x = ((xhwList[i].position.x * 100 - speed * 100) / 100).toFixed(3) * 1
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
    //叉车
    if(this.isPlay){
      if(this.chache && this.chache2 && this.chacheGroup){
        if(chacheProgress >= 1) {chacheProgress =0 ;isPoint=false;this.huodunNum <=2 ? this.chacheGroup.add(this.huodun) :''};
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
          },200)
        }else{
          let chachePoint1 = curve1.getPoint(chacheProgress+0.001*2)
          this.chacheGroup.lookAt(chachePoint1.x,chachePoint1.y,chachePoint1.z)
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
