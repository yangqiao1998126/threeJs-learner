import {gltfModelPromise, modelPromise} from "./TLoader";
import {Group} from "three";
import Event from "./TObjectClick";
import {MeshBasicMaterial, DoubleSide} from 'three'
import {Tween} from "@tweenjs/tween.js";

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
export let loadModelFun = function (modelObjs) {
  return async (res) => {
    let dimian = res.scene
    dimian.children[0].material.roughness = 0.8
    dimian.position.set(0, 0, 0)
    dimian.scale.set(1.6, 2, 1)
    this.scene.add(dimian)
    let startVal = {x:1.6,y:2,z:1}
    let endVal = {x:3.2,y:4,z:2}
    // let tween1 = new Tween(startVal)
    //   .delay(10000)
    //   .to({x:3.2,y:4,z:2},5000)
    //   .onUpdate(() => {
    //     dimian.scale.set(startVal.x,startVal.y,startVal.z)
    //   })
    //   .onComplete((x)=>{
    //     console.log('完成',x)
    //   })
    // //tween1.chain(动画2) //在tween1动画结束后执行动画2
    //   .start()
    //练习 TWEEN的 使用
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
      let shebei2Clone = shebei2.clone()
      shebei2Clone.name = `shebei2Clone${i}`
      let [x, y, z] = shebeierList[i]
      shebei2Clone.position.set(x, y, z)
      shebei2Clone.rotateY(-Math.PI / 2)
      this.scene.add(shebei2Clone)
    }

    let shebei5List = [[-65, 0, -70], [-65, 0, 20]]
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
      [[-46, 4, 20.5], [-121.5, 0, 20.5]],
      [[-46, 4, -69.3], [-121.5, 0, -69.3]],
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

    /*   let build1 = await  modelPromise(modelObjs.low_building_1)
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
       this.buildGroup.visible = false*/

    window._event.emit('model-loading-finished')
    Event(this)

  }
}

