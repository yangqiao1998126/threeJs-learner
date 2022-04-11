import {Group} from "three";
import {Tween} from "@tweenjs/tween.js";
export class JxbAnimation {
  constructor(engine,jixiebi,huopinhe,tuopan,huopinheList1,jixiebiGroupZ,tuopanZ) {
    this.scene = engine.scene
    this.jixiebiGroup = new Group()
    this.jixiebiGroupAndTuopan(this.jixiebiGroup,huopinhe,jixiebi,tuopan,tuopanZ,huopinheList1,jixiebiGroupZ)
    this.hphList  =huopinheList1.length-1
    this.jxbNum = this.hphList

    //下臂动作
    this._tween1_down_jxbJia_jxbGan()
    //上臂动作
    this._tween1_up_jxbJia_jxbGan()
    //旋转到传送带的位置
    this._tween1()
    //旋转到获墩处
    this._tween2()
    //卸货的下降动作
    this._tween1_xiehuo_down()
    //卸完货升起动作
    this._tween1_xiehuo_up()

    this.tween1_down_jxbJia_jxbGan.chain(this.tween1_up_jxbJia_jxbGan)
    this.tween1_up_jxbJia_jxbGan.chain(this.tween1)
    this.tween1.chain(this.tween1_xiehuo_down)
    this.tween1_xiehuo_down.chain(this.tween1_xiehuo_up)
    this.tween1_xiehuo_up.chain(this.tween2)
    this.tween2.chain(this.tween1_down_jxbJia_jxbGan)
    // this.tween1_down_jxbJia_jxbGan.start()
  }
  removeHph(name){
    if (this.scene.getObjectByName(name)) {
      this.scene.remove(this.scene.getObjectByName(name))
      return true
    }
    return false
  }
  jixiebiGroupAndTuopan(jixiebiGroup,huopinhe,jixiebi,tuopan,tuopanZ,huopinheList1,jixiebiGroupZ){
    //机械臂
    jixiebi.scale.set(1.5, 1.5, 1.5)
    // jixiebiGroup.position.set(-22, 4.5, -77)
    jixiebiGroup.position.set(-22, 4.5, jixiebiGroupZ)
    jixiebiGroup.rotation.y = -Math.PI * 50 / 180
    let hphJxb = huopinhe.clone()
    hphJxb.position.set(3.8, 1.1, -6.6)
    // hphJxb.position.set(3.8, -0.28, -7.6)
    hphJxb.scale.set(1.7, 1.7, 1.7)
    hphJxb.visible = false
    this.hphJxb = hphJxb
    jixiebiGroup.add(jixiebi)
    jixiebiGroup.add(hphJxb)
    this.jxbJia = jixiebiGroup.getObjectByName('jixiebi')
    this.jxbGan = jixiebiGroup.getObjectByName('jixiebi004')
    this.scene.add(jixiebiGroup)
    let tuopan1 = tuopan.clone()
    tuopan1.position.set(-14, 0.5, tuopanZ)
    this.scene.add(tuopan1)
    for (let i = 0; i < huopinheList1.length; i++) {
      let hphClone = huopinhe.clone()
      let [x, y, z] = huopinheList1[i]
      hphClone.scale.y = 1.6
      hphClone.position.set(x, y, z)
      hphClone.name = `huopinheList-${i}`
      this.scene.add(hphClone)
    }
  }

  _tween1_down_jxbJia_jxbGan(){
    let tween1_down_jxbJia_jxbGan_start = {jxbGan: 5.38, jxbJia: 0.64,hphJxbY:1.1}
    this.tween1_down_jxbJia_jxbGan = new Tween(tween1_down_jxbJia_jxbGan_start)
      .delay(500)
      .to({jxbGan: 3, jxbJia: -2,hphJxbY:-3}, 1000)
      .onUpdate(() => {
        this.jxbGan.position.y = tween1_down_jxbJia_jxbGan_start.jxbGan
        this.jxbJia.position.y = tween1_down_jxbJia_jxbGan_start.jxbJia
        this.hphJxb.position.y = tween1_down_jxbJia_jxbGan_start.hphJxbY
      })
      .onStart(() => {
        console.log('下臂动作开始执行前',this.jxbNum)
        if(this.jxbNum === -1)this.tween1_down_jxbJia_jxbGan.stop()
      })
      .onComplete(() => {
        this.removeHph(`huopinheList-${this.jxbNum}`)
        --this.jxbNum
        if (this.jxbNum >= -1) this.hphJxb.visible = true
      });

  }
  _tween1_up_jxbJia_jxbGan(){
    let tween1_up_jxbJia_jxbGan_start = {jxbGan: 3, jxbJia: -2,hphJxbY:-3}
    this.tween1_up_jxbJia_jxbGan = new Tween(tween1_up_jxbJia_jxbGan_start)
      .delay(500)
      .to({jxbGan: 5.38, jxbJia: 0.64,hphJxbY:1.1}, 1000)
      .onUpdate(() => {
        this.jxbGan.position.y = tween1_up_jxbJia_jxbGan_start.jxbGan
        this.jxbJia.position.y = tween1_up_jxbJia_jxbGan_start.jxbJia
        this.hphJxb.position.y = tween1_up_jxbJia_jxbGan_start.hphJxbY
      })
      .onComplete(() => {
      })
  }
  _tween1(){
    let startVal1 = {angle: 50}
    this.tween1 = new Tween(startVal1)
      .delay(500)
      .to({angle: 180}, 1000)
      .onUpdate(() => {
        let angle = startVal1.angle.toFixed(2)
        this.jixiebiGroup.rotation.y = -Math.PI * angle / 180
      })
      .onComplete((x) => {

      })
  }
  _tween2(){
    let startVal2 = {angle: 180}
    this.tween2 = new Tween(startVal2)
      .delay(500)
      .to({angle: 50}, 1000)
      .onUpdate(() => {
        let angle = startVal2.angle.toFixed(2)
        this.jixiebiGroup.rotation.y = -Math.PI * angle / 180
      })
      .onComplete((x) => {

      })
  }
  _tween1_xiehuo_down(){
    let tween1_xiehuo_down_start = {jxbJiaY:0.64,jxbGanY:5.38,hphJxbY:1.1,hphJxbZ:-6.6}
    this.tween1_xiehuo_down = new Tween(tween1_xiehuo_down_start)
      .delay(300)
      .to({jxbJiaY:-0.11,jxbGanY:4.72,hphJxbY:-0.41,hphJxbZ:-7.6},1000)
      .onUpdate(() => {
        let {jxbJiaY,jxbGanY,hphJxbY,hphJxbZ} = tween1_xiehuo_down_start
        this.jxbJia.position.y = jxbJiaY
        this.jxbGan.position.y = jxbGanY
        this.hphJxb.position.y = hphJxbY
        this.hphJxb.position.z = hphJxbZ
      })
      .onComplete(() => {
        setTimeout(() => {
          this.hphJxb.position.set(3.8, 1.1, -6.6)
          this.hphJxb.visible = false
        },800)
      })
  }
  _tween1_xiehuo_up(){
    let tween1_xiehuo_up_start = {jxbJiaY:-0.11,jxbGanY:4.62,hphJxbY:-0.28,hphJxbZ:-7.6}
    this.tween1_xiehuo_up= new Tween(tween1_xiehuo_up_start)
      .delay(800)
      .to({jxbJiaY:0.64,jxbGanY:5.38,hphJxbY:1.1,hphJxbZ:-6.6},1000)
      .onUpdate(() => {
        let {jxbJiaY,jxbGanY,hphJxbY,hphJxbZ} = tween1_xiehuo_up_start
        this.jxbJia.position.y = jxbJiaY
        this.jxbGan.position.y = jxbGanY
        this.hphJxb.position.y = hphJxbY
        this.hphJxb.position.z = hphJxbZ
      })
      .onComplete(() => {
      })
  }
}
// export function jxbAnimation(jixiebi,huopinhe,tuopan,huopinheList1,jixiebiGroupZ,tuopanZ){
//   let jixiebiGroup = new Group()
//   //机械臂
//   jixiebi.scale.set(1.5, 1.5, 1.5)
//   // jixiebiGroup.position.set(-22, 4.5, -77)
//   jixiebiGroup.position.set(-22, 4.5, jixiebiGroupZ)
//   jixiebiGroup.rotation.y = -Math.PI * 50 / 180
//   let hphJxb = huopinhe.clone()
//   hphJxb.position.set(3.8, 1.1, -6.6)
//   // hphJxb.position.set(3.8, -0.28, -7.6)
//   hphJxb.scale.set(1.7, 1.7, 1.7)
//   hphJxb.visible = false
//   jixiebiGroup.add(jixiebi)
//   jixiebiGroup.add(hphJxb)
//   let jxbJia = jixiebiGroup.getObjectByName('jixiebi')
//   let jxbGan = jixiebiGroup.getObjectByName('jixiebi004')
//   this.scene.add(jixiebiGroup)
//
//   let removeHph = (name) => {
//     if (this.scene.getObjectByName(name)) {
//       this.scene.remove(this.scene.getObjectByName(name))
//       return true
//     }
//     return false
//   }
//   let tuopan1 = tuopan.clone()
//   tuopan1.position.set(-14, 0.5, tuopanZ)
//   this.scene.add(tuopan1)
//   // let huopinheList1 = [
//   //   [-15.4, 1.5, -80.2], [-12.9, 1.5, -80.2], [-15.4, 1.5, -78.9], [-12.9, 1.5, -78.9], [-15.4, 1.5, -77.5], [-12.9, 1.5, -77.5],
//   //   [-15.4, 2.2, -80.2], [-12.9, 2.2, -80.2], [-15.4, 2.2, -78.9], [-12.9, 2.2, -78.9], [-15.4, 2.2, -77.5], [-12.9, 2.2, -77.5],
//   //   [-15.4, 2.9, -80.2], [-12.9, 2.9, -80.2], [-15.4, 2.9, -78.9], [-12.9, 2.9, -78.9], [-15.4, 2.9, -77.5], [-12.9, 2.9, -77.5],
//   // ]
//   for (let i = 0; i < huopinheList1.length; i++) {
//     let hphClone = huopinhe.clone()
//     let [x, y, z] = huopinheList1[i]
//     hphClone.scale.y = 1.6
//     hphClone.position.set(x, y, z)
//     hphClone.name = `huopinheList-${i}`
//     this.scene.add(hphClone)
//   }
//    let jxbNum = huopinheList1.length - 1
//   //------------------下臂 动作
//   let tween1_down_jxbJia_jxbGan_start = {jxbGan: 5.38, jxbJia: 0.64,hphJxbY:1.1}
//   let tween1_down_jxbJia_jxbGan = new Tween(tween1_down_jxbJia_jxbGan_start)
//     .delay(500)
//     .to({jxbGan: 3, jxbJia: -2,hphJxbY:-3}, 1000)
//     .onUpdate(() => {
//       jxbGan.position.y = tween1_down_jxbJia_jxbGan_start.jxbGan
//       jxbJia.position.y = tween1_down_jxbJia_jxbGan_start.jxbJia
//       hphJxb.position.y = tween1_down_jxbJia_jxbGan_start.hphJxbY
//     })
//     .onStart(() => {
//         console.log('下臂动作开始执行前',jxbNum)
//       if(jxbNum === -1)tween1_down_jxbJia_jxbGan.stop()
//     })
//     .onComplete(() => {
//       removeHph(`huopinheList-${jxbNum}`)
//       --jxbNum
//       if (jxbNum >= -1) hphJxb.visible = true
//     })
//   //------------------上臂 动作
//   let tween1_up_jxbJia_jxbGan_start = {jxbGan: 3, jxbJia: -2,hphJxbY:-3}
//   let tween1_up_jxbJia_jxbGan = new Tween(tween1_up_jxbJia_jxbGan_start)
//     .delay(500)
//     .to({jxbGan: 5.38, jxbJia: 0.64,hphJxbY:1.1}, 1000)
//     .onUpdate(() => {
//       jxbGan.position.y = tween1_up_jxbJia_jxbGan_start.jxbGan
//       jxbJia.position.y = tween1_up_jxbJia_jxbGan_start.jxbJia
//       hphJxb.position.y = tween1_up_jxbJia_jxbGan_start.hphJxbY
//     })
//     .onComplete(() => {
//     })
//   //------------------旋转到传送带 动作
//   let startVal1 = {angle: 50}
//   let tween1 = new Tween(startVal1)
//     .delay(500)
//     .to({angle: 180}, 1000)
//     .onUpdate(() => {
//       let angle = startVal1.angle.toFixed(2)
//       jixiebiGroup.rotation.y = -Math.PI * angle / 180
//     })
//     .onComplete((x) => {
//
//     })
//   //------------------旋转到获墩处 动作
//   let startVal2 = {angle: 180}
//   let tween2 = new Tween(startVal2)
//     .delay(500)
//     .to({angle: 50}, 1000)
//     .onUpdate(() => {
//       let angle = startVal2.angle.toFixed(2)
//       jixiebiGroup.rotation.y = -Math.PI * angle / 180
//     })
//     .onComplete((x) => {
//
//     })
//   //------------------卸货的下降 动作
//   let tween1_xiehuo_down_start = {jxbJiaY:0.64,jxbGanY:5.38,hphJxbY:1.1,hphJxbZ:-6.6}
//   let tween1_xiehuo_down = new Tween(tween1_xiehuo_down_start)
//     .delay(300)
//     .to({jxbJiaY:-0.11,jxbGanY:4.62,hphJxbY:-0.28,hphJxbZ:-7.6},1000)
//     .onUpdate(() => {
//       let {jxbJiaY,jxbGanY,hphJxbY,hphJxbZ} = tween1_xiehuo_down_start
//       jxbJia.position.y = jxbJiaY
//       jxbGan.position.y = jxbGanY
//       hphJxb.position.y = hphJxbY
//       hphJxb.position.z = hphJxbZ
//     })
//     .onComplete(() => {
//         setTimeout(() => {
//           hphJxb.position.set(3.8, 1.1, -6.6)
//           hphJxb.visible = false
//         },800)
//     })
//   //------------------卸完货升起 动作
//   let tween1_xiehuo_up_start = {jxbJiaY:-0.11,jxbGanY:4.62,hphJxbY:-0.28,hphJxbZ:-7.6}
//   let tween1_xiehuo_up= new Tween(tween1_xiehuo_up_start)
//     .delay(800)
//     .to({jxbJiaY:0.64,jxbGanY:5.38,hphJxbY:1.1,hphJxbZ:-6.6},1000)
//     .onUpdate(() => {
//       let {jxbJiaY,jxbGanY,hphJxbY,hphJxbZ} = tween1_xiehuo_up_start
//       jxbJia.position.y = jxbJiaY
//       jxbGan.position.y = jxbGanY
//       hphJxb.position.y = hphJxbY
//       hphJxb.position.z = hphJxbZ
//     })
//     .onComplete(() => {
//     })
//   tween1_down_jxbJia_jxbGan.chain(tween1_up_jxbJia_jxbGan)
//   tween1_up_jxbJia_jxbGan.chain(tween1)
//   tween1.chain(tween1_xiehuo_down)
//   tween1_xiehuo_down.chain(tween1_xiehuo_up)
//   tween1_xiehuo_up.chain(tween2)
//   tween2.chain(tween1_down_jxbJia_jxbGan)
//   tween1_down_jxbJia_jxbGan.start()
//
// }
