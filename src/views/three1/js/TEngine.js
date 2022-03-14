import dat from "dat.gui/src/dat";
import 'dat.gui/src/dat/utils/css'
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
  Group,
  Object3D} from "three"
import Event from "./TObjectClick";
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { SSAARenderPass} from 'three/examples/jsm/postprocessing/SSAARenderPass.js'
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
    "平行光强度":2,
  },
  ambientLightGui:{
    "环境光颜色":'#fff',
    "环境光强度":1.22,
  },
  "是否显示光源辅助线":true,
  "抗锯齿Level":0
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
      this.newXhwList2 && this.newXhwList2.length >0 &&this.handleXhw('xhwEnd2',this.newXhwList2,-56,7,[-46,4,20.5],[-117,4,20.5],0.15),
      this.newXhwList3 && this.newXhwList3.length >0 &&this.handleXhw('xhwEnd3',this.newXhwList3,-60.2,5,[-46,4,-69.3],[-117,4,-69.3],0.11)
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

      let shebeiyiList = [[60,0,-60],[38,0,-60],[60,0,-40],[38,0,-40],[60,0,-20],[38,0,-20]]
      let shebei1 = (await gltfModelPromise(modelObjs.shebei1)).scene
      shebei1.scale.set(1.1,1.1,1.1)
      for(let i = 0;i<shebeiyiList.length;i++){
        let shebei1Clone = shebei1.clone()
        shebei1Clone.name = `shebei1Clone${i}`
        let [x,y,z] = shebeiyiList[i]
        shebei1Clone.position.set(x,y,z)
        shebei1Clone.rotateY(-Math.PI/2)
        this.scene.add(shebei1Clone)
      }

      let shebei3 = (await gltfModelPromise(modelObjs.shebei3)).scene
      shebei3.position.set(45,0,35)
      shebei3.scale.set(1.1,1.1,1.1)
      shebei3.rotateY(-Math.PI/2)
      this.scene.add(shebei3)

      let shebeierList = [[14,0,-60],[14,0,-40],[14,0,-20]]
      let shebei2 = (await gltfModelPromise(modelObjs.shebei2)).scene
      shebei2.scale.set(1.1,1.1,1.1)
      for(let i = 0;i<shebeierList.length;i++){
        let shebei2Clone = shebei2.clone()
        shebei2Clone.name = `shebei2Clone${i}`
        let [x,y,z] = shebeierList[i]
        shebei2Clone.position.set(x,y,z)
        shebei2Clone.rotateY(-Math.PI/2)
        this.scene.add(shebei2Clone)
      }

      let shebei5List = [[-65,0,-70],[-65,0,20]]
      let shebei5 = (await gltfModelPromise(modelObjs.shebei5)).scene
      shebei5.scale.set(1.2,1.2,1.2)
      for(let i = 0;i<shebei5List.length;i++){
        let shebei5Clone = shebei5.clone()
        shebei5Clone.name = `shebei5Clone${i}`
        let [x,y,z] = shebei5List[i]
        shebei5Clone.position.set(x,y,z)
        shebei5Clone.rotateY(-Math.PI/2)
        this.scene.add(shebei5Clone)
      }

      let shebei6List = [[-65,0,-20],[-65,0,70]]
      let shebei6 = (await gltfModelPromise(modelObjs.shebei6)).scene
      shebei6.scale.set(1.2,1.2,1.2)
      for(let i = 0;i<shebei6List.length;i++){
        let shebei6Clone = shebei6.clone()
        shebei6Clone.name = `shebei6Clone${i}`
        let [x,y,z] = shebei6List[i]
        shebei6Clone.position.set(x,y,z)
        shebei6Clone.rotateY(-Math.PI/2)
        this.scene.add(shebei6Clone)
      }

      //传送带 货品和相关
      let xhwEndList = [
        [ [184.5,4.2,93.5],[61,0,93.5] ],
        [ [184.5,4.2,80.8],[5.5,0,82] ],
        [ [-46,4,20.5],[-121.5,0,20.5] ],
        [ [-46,4,-69.3],[-121.5,0,-69.3] ],
      ]
      //1. [184.5,4.2,93.5],[66,4.2,93.5],[61,0,93.5]
      //2. [184.5,4.2,80.8], [9,4.2,80.8]   [5.5,0,82]
      //3. [-46,4,20.5],[-117,4,20.5] [-121.5,0,20.5]
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

      let build1 = await  modelPromise(modelObjs.low_building_1)
      // build1.position.set(0,0,0)
      // build1.name= '6666'
      // build1.scale.set(2,2,2)
      // console.log(build1)
      // this.scene.add(build1)
      let buildGroup = new Group()
      for (let index = 1; index < 3; index++) {
        const cloneObj = build1.clone()
        build1.scale.set(0.7,0.5,0.7)
        cloneObj.position.set(-100+index*70, 0, -240)
        buildGroup.add(build1)
        // this.scene.add(cloneObj)
      }
      buildGroup.position.set(-80,0,-200)
      this.scene.add(buildGroup)
      this.buildGroup = buildGroup
      this.buildGroup.visible = false

      window._event.emit('model-loading-finished')
      Event(this)
    })
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
