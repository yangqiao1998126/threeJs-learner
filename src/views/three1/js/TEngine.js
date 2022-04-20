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
  CubeTextureLoader,
  Euler,
  PlaneBufferGeometry,
  MeshPhysicalMaterial,
  MeshBasicMaterial,
  DoubleSide,
  Group,
  Object3D
} from "three"
import Event from "./event/TObjectClick";
import Stats from 'three/examples/jsm/libs/stats.module'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {SSAARenderPass} from 'three/examples/jsm/postprocessing/SSAARenderPass.js'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'
import {OutlinePass} from 'three/examples/jsm/postprocessing/OutlinePass.js'
import {CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import {modelPromise} from "./loader/TLoader";
import {spotLight, ambientLight, Dlight} from "./base/Tlights";
import {pointLightHelper, spotLightHelper, DLightHelper} from './base/THelper'
import {gltfModelPromise} from "./loader/TLoader";
import Three1 from "../three1";
import scene from "three/examples/jsm/offscreen/scene";
import {curve1, curve2} from "./base/TBasicObject";
import {loadModelFun, jxbAnimationList} from "./loader/loadModel";
import TWEEN from "@tweenjs/tween.js";
import {modelObjs, guiObj, guiFun} from "./constant/constant";
import {WS} from "./event/webSocket";
//图形界面控制器
let gui = new dat.GUI()
gui = guiFun(gui)
let progress = 0
let chacheProgress = 0
let prevTime = Date.now()
let isPoint = false
let cylinderRadius = 0;
let cylinderOpacity= 1;

export class TEngine {
  xhwNum = 0
  isPlay = true
  huodunNum = 0
  xhwList = []
  xhwList1 = []

  constructor(dom) {
    this.dom = dom
    this.initBaseFactor()
    //自适应窗口
    this.resize()
    //初始线条渲染
    this.useEffectComposer()
    // 初始性能监视器ss
    let stats = Stats()
    const statsDom = stats.domElement
    statsDom.style.position = 'fixed'
    statsDom.style.top = '0'
    statsDom.style.right = '5px'
    statsDom.style.left = 'unset'
    const renderFun = () => {
      this.requestAnimationFrameFun(stats)
      this.wsConnecet && this.wsChacheEvent()
      requestAnimationFrame(renderFun)
    }
    renderFun()
    this.loadObjModel()
    dom.appendChild(this.renderer.domElement)
    dom.appendChild(statsDom)
    if (process.env.NODE_ENV === 'development') {
      new WS(this)
    }

  }

  initBaseFactor() {
    this.renderer = new WebGLRenderer({
      antialias: true,
      // alpha:true
    })
    this.renderer.shadowMap.enabled = true
    this.scene = new Scene()
    let {dom} = this
    let textureCube = new CubeTextureLoader();
    textureCube.setPath('/img/');
    let cubeTexture = textureCube.load([
      'right.jpg', 'left.jpg',
      'top.jpg', 'bottom.jpg',
      'front.jpg', 'back.jpg'
    ]);
    this.scene.background = cubeTexture
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 5, 1855)
    this.camera.position.set(-10, 60, 100)
    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)
    //css2DRender
    this.labelRender = new CSS2DRenderer()
    this.labelRender.setSize(dom.offsetWidth, dom.offsetHeight)
    this.labelRender.domElement.style.position = 'absolute'
    this.labelRender.domElement.style.top='0px'
    document.body.appendChild(this.labelRender.domElement)
    // 初始orbitControls
    // this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.orbitControls = new OrbitControls(this.camera, this.labelRender.domElement)
    this.orbitControls.mouseButtons = {
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    }
    this.orbitControls.maxDistance = 400
    this.orbitControls.minDistance = 5
    this.orbitControls.maxZoom = 600
    this.orbitControls.maxZoom = 10
    this.orbitControls.maxPolarAngle = Math.PI / 2.2
  }

  requestAnimationFrameFun(stats) {
    this.apertureList && this.apertureList.length > 0 && this.apertureList.forEach( i => i.changeMaterial())
    let lineMesh = this.scene.getObjectByName('lineMesh')
    this.GUI()
    // if ( this.mixer ) {
    //   const time = Date.now();
    //   this.mixer.update( ( time - prevTime ) * 0.001 );
    //   prevTime = time;
    // }
    this.isPlay && (
      this.newXhwList0 && this.newXhwList0.length > 0 && this.handleXhw('xhwEnd0', this.newXhwList0, 160, 5, [184.5, 4.2, 93.5], [66, 4.2, 93.5]),
      this.newXhwList1 && this.newXhwList1.length > 0 && this.handleXhw('xhwEnd1', this.newXhwList1, 167, 10, [184.5, 4.2, 80.8], [9, 4.2, 80.8], 0.2),
      this.newXhwList2 && this.newXhwList2.length > 0 && this.handleXhw('xhwEnd2', this.newXhwList2, -36, 7, [-26, 4, 20.5], [-97, 4, 20.5], 0.15),
      this.newXhwList3 && this.newXhwList3.length > 0 && this.handleXhw('xhwEnd3', this.newXhwList3, -40.2, 5, [-26, 4, -69.3], [-97, 4, -69.3], 0.11),
        this.startJxbAnimation(),
        lineMesh &&(lineMesh.visible = true,lineMesh.material.map.offset.x-=0.03)
    )||( lineMesh &&(lineMesh.visible = false))
    this.orbitControls.update()
    this.renderPass.sampleLevel = guiObj['抗锯齿Level']
    this.composer.render()
    this.labelRender.render(this.scene,this.camera)
    stats.update()
  }

  startJxbAnimation() {
    if (jxbAnimationList.every(item => item.jxbNum === item.hphList) && !jxbAnimationList.every(item => item.flag)) {
      jxbAnimationList.forEach(item => {
        item.flag = true
        item.tween1_down_jxbJia_jxbGan.start()
        TWEEN.update()
      })
    } else {
      TWEEN.update()
    }
  }

  useEffectComposer() {
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

  getPosition(point) {
    const halfWidth = window.innerWidth / 2
    const halfHeight = window.innerHeight / 2
    const vector1 = point.project(this.camera)
    return [vector1.x * halfWidth + halfWidth, -vector1.y * halfHeight + halfHeight]
  }

  resize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = this.renderer.domElement.width / this.renderer.domElement.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight, true)
      this.labelRender.setSize(this.dom.offsetWidth, this.dom.offsetHeight)
    }, false)
  }

  loadObjModel() {
    gltfModelPromise(modelObjs.zhoubianjianzhu).then(loadModelFun.call(this, modelObjs))
  }

  handleXhw(endXhwName, xhwList, distance, num, [x, y, z], endPosition, speed = 0.06) {
    let endXhw = this.scene.getObjectByName(endXhwName)
    for (let i = 0; i < xhwList.length; i++) {
      if (xhwList[i] && xhwList[i].position) {
        if (xhwList[i].position.x < distance && xhwList.length <= i + 1 && xhwList.length < num) {
          let xhwClone = xhwList[0].clone()
          xhwClone.position.set(x, y, z)
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

  loadHuodun() {
    for (let i = 0; i < this.huodunNum; i++) {
      let hd = this.huodun.clone()
      hd.name = `获墩遍历生成${i}`
      if (this.scene.getObjectByName(`获墩遍历生成${i}`)) {

      } else {
        hd.position.set(185, 0, 100 + i * 5)
        this.scene.add(hd)
      }
    }
  }

  GUI() {
    //光源相关GUI
    // spotLight.position.x = guiObj.spotLightGui.x
    Dlight.intensity = guiObj.spotLightGui['平行光强度']
    Dlight.color = new Color(guiObj.spotLightGui['平行光颜色'])
    ambientLight.intensity = guiObj.ambientLightGui['环境光强度']
    ambientLight.color = new Color(guiObj.ambientLightGui['环境光颜色'])
    if (guiObj['是否显示光源辅助线']) {
      DLightHelper.visible = true
      pointLightHelper.visible = true
    } else {
      DLightHelper.visible = false
      pointLightHelper.visible = false
    }
    //叉车
    if (this.isPlay) {
      if (this.chache && this.chache2 && this.chacheGroup) {
        if (chacheProgress >= 1) {
          chacheProgress = 0;
          isPoint = false;
          this.huodunNum <= 2 ? this.chacheGroup.add(this.huodun) : ''
        }
        chacheProgress = (chacheProgress * 1000 + 0.003 * 1000) / 1000
        let chachePoint = curve1.getPoint(chacheProgress)
        let {x, y, z} = chachePoint
        if (Math.abs(Math.abs(x).toFixed(3) - 190) <= 6 && Math.abs(Math.abs(z).toFixed(3) - 100) <= 4 && !isPoint && this.huodunNum <= 2) {
          isPoint = true
          this.isPlay = false
          console.log('到达指定位置了',)
          this.chacheGroup.remove(this.chacheGroup.getObjectByName('货墩1'))
          this.huodunNum += 1
          setTimeout(() => {
            this.isPlay = true
          }, 50)
        } else {
          let chachePoint1 = curve1.getPoint(chacheProgress + 0.001 * 2)
          this.chacheGroup.lookAt(chachePoint1.x, chachePoint1.y, chachePoint1.z)
          this.chacheGroup.position.set(chachePoint.x, chachePoint.y, chachePoint.z)
          let chachePoint2 = curve2.getPoint(chacheProgress)
          let chachePoint22 = curve2.getPoint(chacheProgress + 0.001 * 2)
          this.chache2.lookAt(chachePoint22.x, chachePoint22.y, chachePoint22.z)
          this.chache2.position.set(chachePoint2.x, chachePoint2.y, chachePoint2.z)
        }

      }
    }
    this.loadHuodun()
  }

  addObject(...object) {
    object.forEach(elem => {
      this.scene.add(elem)
    })
  }
}
