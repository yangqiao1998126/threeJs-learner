import {gltfModelPromise, modelPromise} from "./TLoader";
import {Group, Mesh, Color} from "three";
import Event from "../event/TObjectClick";
import {MeshBasicMaterial, DoubleSide} from 'three'
import {Tween} from "@tweenjs/tween.js";
import {JxbAnimation} from "../jxb/jxbAnimation";

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
export let jxbAnimationList = []
export let loadModelFun = function (modelObjs) {
  return async (res) => {
    let build = res.scene
    build.traverse(function (obj) {
      if (obj instanceof Mesh) {
        if (obj.name === 'zbhj_dm1') {
          obj.material.emissive = new Color(189 / 255, 163 / 255, 238 / 255)
          obj.material.emissiveIntensity = 0.8;
          obj.material.emissiveMap = obj.material.map;
        } else if (obj.name === 'zbhj_dm2') {
          obj.material.emissive = new Color(157 / 255, 147 / 255, 147 / 255)
          obj.material.emissiveIntensity = 0.6;
          obj.material.emissiveMap = obj.material.map;
        } else {
          obj.material.emissive = new Color(145 / 255, 135 / 255, 171 / 255)
          obj.material.emissiveIntensity = 0.8;
          obj.material.emissiveMap = obj.material.map;
        }

      }
    });
    build.getObjectByName('zbhj_dm2').castShadow = false
    build.getObjectByName('zbhj_dm1').castShadow = false
    build.position.set(35, 0, 0)
    build.rotateY(-Math.PI / 2)
    this.scene.add(build)

    let cangchuqu = (await gltfModelPromise(modelObjs.cangchuqu)).scene
    cangchuqu.position.set(160, 0, 0)
    cangchuqu.scale.set(1.4, 1.4, 1.4)
    cangchuqu.rotateY(-Math.PI / 2)
    changeMaterialOpc(cangchuqu, 'Cube_1', 'Cube033_1')
    this.scene.add(cangchuqu)

    let chache = (await gltfModelPromise(modelObjs.chache)).scene
    // chache.position.set(20,0,20)
    chache.scale.set(1.1, 1.1, 1.1)
    this.chache = chache
    this.chache2 = chache.clone()
    this.chache2.position.set(20, 0, 0)
    this.scene.add(this.chache2)

    let longmenjia = (await gltfModelPromise(modelObjs.longmenjia)).scene
    longmenjia.position.set(100, 0, 0)
    longmenjia.scale.set(1.1, 1.1, 1.1)
    longmenjia.rotateY(-Math.PI / 2)
    this.scene.add(longmenjia)

    let huodun = (await gltfModelPromise(modelObjs.huodun)).scene
    let huodun1 = huodun.clone()
    huodun1.position.set(20, 0, 35)
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
    tuopan.position.set(20, 0, 42)
    tuopan.scale.set(1.1, 1.1, 1.1)
    this.scene.add(tuopan)

    let dipan = (await gltfModelPromise(modelObjs.dipan)).scene
    dipan.position.set(20, 0, 47)
    dipan.scale.set(1.1, 1.1, 1.1)
    dipan.rotateY(-Math.PI / 2)
    this.scene.add(dipan)

    let huopinhe = (await gltfModelPromise(modelObjs.huopinhe)).scene
    huopinhe.position.set(20, 0, 51)
    huopinhe.scale.set(1.1, 1.1, 1.1)
    huopinhe.rotateY(-Math.PI / 2)
    this.scene.add(huopinhe)

    let shebeiyiList = [[60, 0, -60], [38, 0, -60], [60, 0, -40], [38, 0, -40], [60, 0, -20], [38, 0, -20]]
    let shebei1 = (await gltfModelPromise(modelObjs.shebei1)).scene
    shebei1.scale.set(1.1, 1.1, 1.1)
    for (let i = 0; i < shebeiyiList.length; i++) {
      let shebei1Clone = shebei1.clone()
      shebei1Clone.name = `shebei1Clone${i}`
      let [x, y, z] = shebeiyiList[i]
      shebei1Clone.position.set(x, y, z)
      shebei1Clone.rotateY(-Math.PI / 2)
      changeMaterialOpc(shebei1Clone, 'Cube039_1')
      this.scene.add(shebei1Clone)
    }

    let shebei3 = (await gltfModelPromise(modelObjs.shebei3)).scene
    shebei3.position.set(45, 0, 35)
    shebei3.scale.set(1.1, 1.1, 1.1)
    shebei3.rotateY(-Math.PI / 2)
    this.scene.add(shebei3)

    let shebeierList = [[14, 0, -60], [14, 0, -40], [14, 0, -20]]
    let shebei2 = (await gltfModelPromise(modelObjs.shebei2)).scene
    shebei2.scale.set(1.1, 1.1, 1.1)
    for (let i = 0; i < shebeierList.length; i++) {
      let shebei2Clone = (await gltfModelPromise(modelObjs.shebei2)).scene
      shebei2Clone.name = `shebei2Clone${i}`
      let [x, y, z] = shebeierList[i]
      shebei2Clone.position.set(x, y, z)
      shebei2Clone.rotateY(-Math.PI / 2)
      this.scene.add(shebei2Clone)
    }

    let shebei5List = [[-45, 0, -70], [-45, 0, 20]]
    let shebei5 = (await gltfModelPromise(modelObjs.shebei5)).scene
    shebei5.scale.set(1.2, 1.2, 1.2)
    for (let i = 0; i < shebei5List.length; i++) {
      let shebei5Clone = shebei5.clone()
      shebei5Clone.name = `shebei5Clone${i}`
      let [x, y, z] = shebei5List[i]
      shebei5Clone.position.set(x, y, z)
      shebei5Clone.rotateY(-Math.PI / 2)
      this.scene.add(shebei5Clone)
    }

    let shebei6List = [[-65, 0, -20], [-65, 0, 70]]
    let shebei6 = (await gltfModelPromise(modelObjs.shebei6)).scene
    shebei6.scale.set(1.2, 1.2, 1.2)
    for (let i = 0; i < shebei6List.length; i++) {
      let shebei6Clone = shebei6.clone()
      shebei6Clone.name = `shebei6Clone${i}`
      let [x, y, z] = shebei6List[i]
      shebei6Clone.position.set(x, y, z)
      shebei6Clone.rotateY(-Math.PI / 2)
      changeMaterialOpc(shebei6Clone, 'Cube057_1', 'Cube058_1')
      this.scene.add(shebei6Clone)
    }

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
      let xhwClone = huopinhe.clone()
      let endClone = huopinhe.clone()
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
    let suodao = (await gltfModelPromise(modelObjs.suodao)).scene
    suodao.position.set(-45, 0, -65)
    suodao.rotateY(-Math.PI / 2)
    this.scene.add(suodao)

    //文件柜
    let wenjiangui2 = (await gltfModelPromise(modelObjs.wenjiangui2)).scene
    wenjiangui2.position.set(125, 0, 55)
    wenjiangui2.rotateY(-Math.PI / 2)
    this.scene.add(wenjiangui2)

    let jixiebi1 = (await gltfModelPromise(modelObjs.jixiebi)).scene
    let huopinheList01 = [
      [-15.4, 1.5, -80.2], [-12.9, 1.5, -80.2], [-15.4, 1.5, -78.9], [-12.9, 1.5, -78.9], [-15.4, 1.5, -77.5], [-12.9, 1.5, -77.5],
      [-15.4, 2.2, -80.2], [-12.9, 2.2, -80.2], [-15.4, 2.2, -78.9], [-12.9, 2.2, -78.9], [-15.4, 2.2, -77.5], [-12.9, 2.2, -77.5],
      [-15.4, 2.9, -80.2], [-12.9, 2.9, -80.2], [-15.4, 2.9, -78.9], [-12.9, 2.9, -78.9], [-15.4, 2.9, -77.5], [-12.9, 2.9, -77.5],
    ]
    // jxbAnimation.call(this,jixiebi1,huopinhe,tuopan,huopinheList01,-77,-79)
    jxbAnimationList.push(new JxbAnimation(this,jixiebi1,huopinhe,tuopan,huopinheList01,-77,-79))

    let jixiebi2 = (await gltfModelPromise(modelObjs.jixiebi)).scene
    let huopinheList02 = [
      [-15.4, 1.5, -80.2+90], [-12.9, 1.5, -80.2+90], [-15.4, 1.5, -78.9+90], [-12.9, 1.5, -78.9+90], [-15.4, 1.5, -77.5+90], [-12.9, 1.5, -77.5+90],
      [-15.4, 2.2, -80.2+90], [-12.9, 2.2, -80.2+90], [-15.4, 2.2, -78.9+90], [-12.9, 2.2, -78.9+90], [-15.4, 2.2, -77.5+90], [-12.9, 2.2, -77.5+90],
     [-15.4, 2.9, -80.2+90], [-12.9, 2.9, -80.2+90], [-15.4, 2.9, -78.9+90], [-12.9, 2.9, -78.9+90], [-15.4, 2.9, -77.5+90], [-12.9, 2.9, -77.5+90],
    ]
    // jxbAnimation.call(this,jixiebi2,huopinhe,tuopan,huopinheList02,13,11)
    jxbAnimationList.push(new JxbAnimation(this,jixiebi2,huopinhe,tuopan,huopinheList02,13,11))


    // let jixiebiGroup = new Group()
    // //机械臂
    // let jixiebi = (await gltfModelPromise(modelObjs.jixiebi)).scene
    // jixiebi.scale.set(1.5, 1.5, 1.5)
    // jixiebiGroup.position.set(-22, 4.5, 13)
    // jixiebiGroup.rotation.y = -Math.PI * 50 / 180
    // let hphJxb = huopinhe.clone()
    // hphJxb.position.set(3.8, 1.1, -6.6)
    // // hphJxb.position.set(3.8, -0.28, -7.6)
    // hphJxb.scale.set(1.7, 1.7, 1.7)
    // // hphJxb.visible = false
    // jixiebiGroup.add(jixiebi)
    // jixiebiGroup.add(hphJxb)
    // let jxbJia = jixiebiGroup.getObjectByName('jixiebi')
    // let jxbGan = jixiebiGroup.getObjectByName('jixiebi004')
    // this.scene.add(jixiebiGroup)
    //
    // let removeHph = (name) => {
    //   if (this.scene.getObjectByName(name)) {
    //     this.scene.remove(this.scene.getObjectByName(name))
    //     return true
    //   }
    //   return false
    // }
    // let tuopan1 = tuopan.clone()
    // tuopan1.position.set(-14, 0.5, 11)
    // this.scene.add(tuopan1)
    // let huopinheList1 = [
    //   [-15.4, 1.5, -80.2+90], [-12.9, 1.5, -80.2+90], [-15.4, 1.5, -78.9+90], [-12.9, 1.5, -78.9+90], [-15.4, 1.5, -77.5+90], [-12.9, 1.5, -77.5+90],
    //   [-15.4, 2.2, -80.2+90], [-12.9, 2.2, -80.2+90], [-15.4, 2.2, -78.9+90], [-12.9, 2.2, -78.9+90], [-15.4, 2.2, -77.5+90], [-12.9, 2.2, -77.5+90],
    //   [-15.4, 2.9, -80.2+90], [-12.9, 2.9, -80.2+90], [-15.4, 2.9, -78.9+90], [-12.9, 2.9, -78.9+90], [-15.4, 2.9, -77.5+90], [-12.9, 2.9, -77.5+90],
    // ]
    // for (let i = 0; i < huopinheList1.length; i++) {
    //   let hphClone = huopinhe.clone()
    //   let [x, y, z] = huopinheList1[i]
    //   hphClone.scale.y = 1.6
    //   hphClone.position.set(x, y, z)
    //   hphClone.name = `huopinheList-${i}`
    //   this.scene.add(hphClone)
    // }
    // let jxbNum = huopinheList1.length - 1
    // //------------------下臂 动作
    // let tween1_down_jxbJia_jxbGan_start = {jxbGan: 5.38, jxbJia: 0.64,hphJxbY:1.1}
    // let tween1_down_jxbJia_jxbGan = new Tween(tween1_down_jxbJia_jxbGan_start)
    //   .delay(500)
    //   .to({jxbGan: 3, jxbJia: -2,hphJxbY:-3}, 1000)
    //   .onUpdate(() => {
    //     jxbGan.position.y = tween1_down_jxbJia_jxbGan_start.jxbGan
    //     jxbJia.position.y = tween1_down_jxbJia_jxbGan_start.jxbJia
    //     hphJxb.position.y = tween1_down_jxbJia_jxbGan_start.hphJxbY
    //   })
    //   .onStart(() => {
    //   })
    //   .onComplete(() => {
    //     removeHph(`huopinheList-${jxbNum}`)
    //     --jxbNum
    //     if (jxbNum >= -1) hphJxb.visible = true
    //   })
    // //------------------上臂 动作
    // let tween1_up_jxbJia_jxbGan_start = {jxbGan: 3, jxbJia: -2,hphJxbY:-3}
    // let tween1_up_jxbJia_jxbGan = new Tween(tween1_up_jxbJia_jxbGan_start)
    //   .delay(500)
    //   .to({jxbGan: 5.38, jxbJia: 0.64,hphJxbY:1.1}, 1000)
    //   .onUpdate(() => {
    //     jxbGan.position.y = tween1_up_jxbJia_jxbGan_start.jxbGan
    //     jxbJia.position.y = tween1_up_jxbJia_jxbGan_start.jxbJia
    //     hphJxb.position.y = tween1_up_jxbJia_jxbGan_start.hphJxbY
    //   })
    //   .onComplete(() => {
    //   })
    // //------------------旋转到传送带 动作
    // let startVal1 = {angle: 50}
    // let tween1 = new Tween(startVal1)
    //   .delay(500)
    //   .to({angle: 180}, 1000)
    //   .onUpdate(() => {
    //     let angle = startVal1.angle.toFixed(2)
    //     jixiebiGroup.rotation.y = -Math.PI * angle / 180
    //   })
    //   .onComplete((x) => {
    //
    //   })
    // //------------------旋转到获墩处 动作
    // let startVal2 = {angle: 180}
    // let tween2 = new Tween(startVal2)
    //   .delay(500)
    //   .to({angle: 50}, 1000)
    //   .onUpdate(() => {
    //     let angle = startVal2.angle.toFixed(2)
    //     jixiebiGroup.rotation.y = -Math.PI * angle / 180
    //   })
    //   .onComplete((x) => {
    //   })
    // //------------------卸货的下降 动作
    // let tween1_xiehuo_down_start = {jxbJiaY:0.64,jxbGanY:5.38,hphJxbY:1.1,hphJxbZ:-6.6}
    // let tween1_xiehuo_down = new Tween(tween1_xiehuo_down_start)
    //   .delay(300)
    //   .to({jxbJiaY:-0.11,jxbGanY:4.62,hphJxbY:-0.28,hphJxbZ:-7.6},1000)
    //   .onUpdate(() => {
    //     let {jxbJiaY,jxbGanY,hphJxbY,hphJxbZ} = tween1_xiehuo_down_start
    //     jxbJia.position.y = jxbJiaY
    //     jxbGan.position.y = jxbGanY
    //     hphJxb.position.y = hphJxbY
    //     hphJxb.position.z = hphJxbZ
    //   })
    //   .onComplete(() => {
    //     hphJxb.position.set(3.8, 1.1, -6.6)
    //     hphJxb.visible = false
    //   })
    // //------------------卸完货升起 动作
    // let tween1_xiehuo_up_start = {jxbJiaY:-0.11,jxbGanY:4.62,hphJxbY:-0.28,hphJxbZ:-7.6}
    // let tween1_xiehuo_up= new Tween(tween1_xiehuo_up_start)
    //   .delay(300)
    //   .to({jxbJiaY:0.64,jxbGanY:5.38,hphJxbY:1.1,hphJxbZ:-6.6},1000)
    //   .onUpdate(() => {
    //     let {jxbJiaY,jxbGanY,hphJxbY,hphJxbZ} = tween1_xiehuo_up_start
    //     jxbJia.position.y = jxbJiaY
    //     jxbGan.position.y = jxbGanY
    //     hphJxb.position.y = hphJxbY
    //     hphJxb.position.z = hphJxbZ
    //   })
    //   .onComplete(() => {
    //   })
    // tween1_down_jxbJia_jxbGan.chain(tween1_up_jxbJia_jxbGan)
    // tween1_up_jxbJia_jxbGan.chain(tween1)
    // tween1.chain(tween1_xiehuo_down)
    // tween1_xiehuo_down.chain(tween1_xiehuo_up)
    // tween1_xiehuo_up.chain(tween2)
    // tween2.chain(tween1_down_jxbJia_jxbGan)
    // setTimeout(() => {
    //   tween1_down_jxbJia_jxbGan.start()
    // },5000)

    window._event.emit('model-loading-finished')
    Event(this)

  }
}
