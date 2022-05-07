import {Font,fontModel, gltfModelPromise} from "./TLoader";
import {Group, Mesh, Color} from "three";
import Event from "../event/TObjectClick";
import {MeshBasicMaterial, DoubleSide} from 'three'
import {JxbAnimation} from "../effect/jxbAnimation";
import {Css2DLabel} from "../base/THelper";
import {Aperture} from "../effect/aperture";
import {tubeLine} from "../base/TBasicObject";

let changeMaterialOpc = (model, ...nameList) => {
  nameList.forEach(name => {
    model.getObjectByName(name).traverse((child) => {
      if (child && child.isMesh) {
        child.material = new MeshBasicMaterial({
          transparent: true, opacity: 0.6, visible: true, color: '#0062f6', side: DoubleSide, depthWrite: false
        });
      }
    })
  })
}
let setEmissive = (obj,...[[r,g,b],emissiveIntensity]) => {
  obj.material.emissive = new Color(r/255,g/255,b/255)
  obj.material.emissiveIntensity = emissiveIntensity
  obj.material.emissiveMap = obj.material.map;
}
export let jxbAnimationList = []
export let loadModelFun = function (modelObjs) {
  return async (res) => {
    let build = res.scene
    build.traverse(function (obj) {
      if (obj instanceof Mesh) {
        switch (obj.name){
          case 'zbhj_dm1':setEmissive(obj,[189,163,238],0.8);break
          case 'zbhj_dm2':setEmissive(obj,[157,147,147],0.6);break
          default: setEmissive(obj,[145,135,171],0.8)
        }
      }
    });
    build.getObjectByName('zbhj_dm2').castShadow = false
    build.getObjectByName('zbhj_dm1').castShadow = false
    build.position.set(35, 0, 0)
    build.rotateY(-Math.PI / 2)
    this.scene.add(build)

    let font = await Font()

    this.scene.add(await tubeLine)

    let storageArea = (await gltfModelPromise(modelObjs.storageArea)).scene
    storageArea.position.set(160, 0, 0)
    storageArea.scale.set(1.4, 1.4, 1.4)
    storageArea.rotateY(-Math.PI / 2)
    changeMaterialOpc(storageArea, 'Cube_1', 'Cube033_1')
    this.scene.add(storageArea)

    let forklift = (await gltfModelPromise(modelObjs.forklift)).scene
    forklift.scale.set(1.1, 1.1, 1.1)
    this.forklift = forklift
    this.forklift2 = forklift.clone()
    this.forklift2.position.set(20, 0, 0)
    this.forklift2.add(new Css2DLabel({textContent:'叉车2'},0,5,0).label)
    this.scene.add(this.forklift2)

    let wsForklift = this.forklift.clone()
    wsForklift.scale.set(1.5,1.5,1.5)
    wsForklift.position.set(20,0,60)
    wsForklift.add(new Css2DLabel({textContent:'ws叉车'},0,5,0).label)
    this.scene.add(wsForklift)
    this.wsObj = {
      wsForklift,
    }

    let gantry = (await gltfModelPromise(modelObjs.gantry)).scene
    gantry.position.set(100, 0, 0)
    gantry.scale.set(1.1, 1.1, 1.1)
    gantry.rotateY(-Math.PI / 2)
    this.scene.add(gantry)

    let goods = (await gltfModelPromise(modelObjs.goods)).scene
    let goods1 = goods.clone()
    goods1.position.set(20, 0, 35)
    this.scene.add(goods1)

    //获墩和叉车组合
    let forkliftGroup = new Group()
    forkliftGroup.add(this.forklift)
    forkliftGroup.add(goods)
    this.forkliftGroup = forkliftGroup
    goods.translateZ(7)
    goods.translateY(1)
    goods.name = '货墩1'
    this.goods = goods
    this.scene.add(forkliftGroup)
    forkliftGroup.add(new Css2DLabel({textContent:'叉车1'},0,5,0).label)
    this.forkliftGroup.position.x = 20
    this.forkliftGroup.position.y = 0
    this.forkliftGroup.position.z = 20

    let tray = (await gltfModelPromise(modelObjs.tray)).scene
    tray.position.set(20, 0, 42)
    tray.scale.set(1.1, 1.1, 1.1)
    this.scene.add(tray)

    let chassis = (await gltfModelPromise(modelObjs.chassis)).scene
    chassis.position.set(20, 0, 47)
    chassis.scale.set(1.1, 1.1, 1.1)
    chassis.rotateY(-Math.PI / 2)
    this.scene.add(chassis)

    let goodsBox = (await gltfModelPromise(modelObjs.goodsBox)).scene
    goodsBox.position.set(20, 0, 51)
    goodsBox.scale.set(1.1, 1.1, 1.1)
    goodsBox.rotateY(-Math.PI / 2)
    this.scene.add(goodsBox)

    let device1List = [[60, 0, -60], [38, 0, -60], [60, 0, -40], [38, 0, -40], [60, 0, -20], [38, 0, -20]]
    let device1 = (await gltfModelPromise(modelObjs.device1)).scene
    device1.scale.set(1.1, 1.1, 1.1)
    for (let i = 0; i < device1List.length; i++) {
      let device1Clone = device1.clone()
      device1Clone.name = `device1Clone${i}`
      let [x, y, z] = device1List[i]
      device1Clone.position.set(x, y, z)
      device1Clone.rotateY(-Math.PI / 2)
      let fm = fontModel(font,`设备1-${i}`,2.5)
      fm.position.set(x-4.3, y+10, z)
      this.scene.add(fm)
      changeMaterialOpc(device1Clone, 'Cube039_1')
      this.scene.add(device1Clone)
    }

    let device3 = (await gltfModelPromise(modelObjs.device3)).scene
    device3.position.set(45, 0, 35)
    device3.scale.set(1.1, 1.1, 1.1)
    device3.rotateY(-Math.PI / 2)
    this.scene.add(device3)
    let {label}= new Css2DLabel({textContent:'设备3'},0,5,0)
    device3.add(label)


    let device2List = [[14, 0, -60], [14, 0, -40], [14, 0, -20]]
    let device2 = (await gltfModelPromise(modelObjs.device2)).scene
    device2.scale.set(1.1, 1.1, 1.1)
    for (let i = 0; i < device2List.length; i++) {
      let device2Clone = (await gltfModelPromise(modelObjs.device2)).scene
      device2Clone.name = `device2Clone${i}`
      let [x, y, z] = device2List[i]
      device2Clone.position.set(x, y, z)
      device2Clone.rotateY(-Math.PI / 2)
      let fm = fontModel(font,`设备2-${i}`,2,0xfe2d2d)
      fm.position.set(x-5, y+9, z)
      this.scene.add(fm)
      this.scene.add(device2Clone)
    }

    let device5List = [[-45, 0, -70], [-45, 0, 20]]
    let device5 = (await gltfModelPromise(modelObjs.device5)).scene
    device5.scale.set(1.2, 1.2, 1.2)
    for (let i = 0; i < device5List.length; i++) {
      let device5Clone = device5.clone()
      device5Clone.name = `device5Clone${i}`
      let [x, y, z] = device5List[i]
      device5Clone.position.set(x, y, z)
      device5Clone.rotateY(-Math.PI / 2)
      let {label}= new Css2DLabel({textContent:'传送带'+i},0,5,0)
      device5Clone.add(label)
      this.scene.add(device5Clone)
    }

    let device6List = [[-65, 0, -20], [-65, 0, 70]]
    let device6 = (await gltfModelPromise(modelObjs.device6)).scene
    device6.scale.set(1.2, 1.2, 1.2)
    for (let i = 0; i < device6List.length; i++) {
      let device6Clone = device6.clone()
      device6Clone.name = `device6Clone${i}`
      let [x, y, z] = device6List[i]
      device6Clone.position.set(x, y, z)
      device6Clone.rotateY(-Math.PI / 2)
      changeMaterialOpc(device6Clone, 'Cube057_1', 'Cube058_1')
      let fm = fontModel(font,`设备6-${i}`,3.8,0x2200b1)
      fm.position.set(x-7.5, y+11, z)
      this.scene.add(fm)
      this.scene.add(device6Clone)
    }
    new Aperture(this,4.5,4,[-65,0,70],0.069,0.009,)
    new Aperture(this,4.5,4,[-65,0,-20],0.073,0.013,'/img/t5.png')

    //传送带 货品和相关
    let xhwEndList = [
      [[184.5, 4.2, 93.5], [61, 0, 93.5]],
      [[184.5, 4.2, 80.8], [5.5, 0, 82]],
      [[-26, 4, 20.5], [-101.5, 0, 20.5]],
      [[-26, 4, -69.3], [-101.5, 0, -69.3]],
    ]
    //1. [184.5,4.2,93.5],[66,4.2,93.5],[61,0,93.5]
    //2. [184.5,4.2,80.8], [9,4.2,80.8]   [5.5,0,82]
    //3. [-46,4,20.5],[-117,4,20.5] [-121.5,0,20.5]
    for (let i = 0; i < xhwEndList.length; i++) {
      let arr = []
      let xhwClone = goodsBox.clone()
      let endClone = goodsBox.clone()
      let [x, y, z] = xhwEndList[i][1]
      let [x1, y1, z1] = xhwEndList[i][0]
      endClone.scale.set(1.8, 1.8, 1.8)
      xhwClone.scale.set(1.8, 1.8, 1.8)
      endClone.position.set(x, y, z)
      xhwClone.position.set(x1, y1, z1)
      endClone.name = 'xhwEnd' + i
      this.scene.add(endClone)
      this.scene.add(xhwClone)
      endClone.visible = false
      arr.push(xhwClone)
      this[`newXhwList${i}`] = [...arr]
    }

    //索道
    let cableway = (await gltfModelPromise(modelObjs.cableway)).scene
    cableway.position.set(-45, 0, -65)
    cableway.rotateY(-Math.PI / 2)
    this.scene.add(cableway)

    //文件柜
    let fileCabinet = (await gltfModelPromise(modelObjs.fileCabinet)).scene
    fileCabinet.position.set(125, 0, 55)
    fileCabinet.rotateY(-Math.PI / 2)
    this.scene.add(fileCabinet)

    let mechanicalArm1 = (await gltfModelPromise(modelObjs.mechanicalArm)).scene
    let goodsBoxList01 = [
      [-15.4, 1.5, -80.2], [-12.9, 1.5, -80.2], [-15.4, 1.5, -78.9], [-12.9, 1.5, -78.9], [-15.4, 1.5, -77.5], [-12.9, 1.5, -77.5],
      [-15.4, 2.2, -80.2], [-12.9, 2.2, -80.2], [-15.4, 2.2, -78.9], [-12.9, 2.2, -78.9], [-15.4, 2.2, -77.5], [-12.9, 2.2, -77.5],
      [-15.4, 2.9, -80.2], [-12.9, 2.9, -80.2], [-15.4, 2.9, -78.9], [-12.9, 2.9, -78.9], [-15.4, 2.9, -77.5], [-12.9, 2.9, -77.5],
    ]
    jxbAnimationList.push(new JxbAnimation(this,mechanicalArm1,goodsBox,tray,goodsBoxList01,-77,-79))

    let mechanicalArm2 = (await gltfModelPromise(modelObjs.mechanicalArm)).scene
    let goodsBoxList02 = goodsBoxList01.map(([x,y,z]) => ([x,y,+z+90]))
    jxbAnimationList.push(new JxbAnimation(this,mechanicalArm2,goodsBox,tray,goodsBoxList02,13,11))

    window._event.emit('model-loading-finished')
    console.log("%c加载完成","background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em")

    Event(this)
    setTimeout(() => {
      this.isPlay= true
      this.renderEnabled = true
    },1500)
  }
}

