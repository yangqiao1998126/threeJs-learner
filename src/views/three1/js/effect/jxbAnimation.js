import {Group} from "three";
import {Tween} from "@tweenjs/tween.js";
import {Css2DLabel} from "../base/THelper";

export class JxbAnimation {

  constructor(engine,mechanicalArm,goodsBox,tray,goodsBoxList1,mechanicalArmGroupZ,trayZ) {
    this.engine = engine
    this.scene = engine.scene
    this.mechanicalArmGroup = new Group()
    this.mechanicalArmGroupAndTray(this.mechanicalArmGroup,goodsBox,mechanicalArm,tray,trayZ,goodsBoxList1,mechanicalArmGroupZ)
    this.hphList  =goodsBoxList1.length-1
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
      this.engine.deleteObj(this.scene.getObjectByName(name))
      // this.scene.remove(this.scene.getObjectByName(name))
      return true
    }
    return false
  }
  mechanicalArmGroupAndTray(mechanicalArmGroup,goodsBox,mechanicalArm,tray,trayZ,goodsBoxList1,mechanicalArmGroupZ){
    //机械臂
    mechanicalArm.scale.set(1.5, 1.5, 1.5)
    // mechanicalArmGroup.position.set(-22, 4.5, -77)
    mechanicalArmGroup.position.set(-22, 4.5, mechanicalArmGroupZ)
    mechanicalArmGroup.rotation.y = -Math.PI * 50 / 180
    let hphJxb = goodsBox.clone()
    hphJxb.position.set(3.8, 1.1, -6.6)
    // hphJxb.position.set(3.8, -0.28, -7.6)
    hphJxb.scale.set(1.7, 1.7, 1.7)
    hphJxb.visible = false
    this.hphJxb = hphJxb
    mechanicalArmGroup.add(mechanicalArm)
    mechanicalArmGroup.add(hphJxb)
    mechanicalArmGroup.add(new Css2DLabel({textContent:'机械臂'},0,5,0).label)
    this.jxbJia = mechanicalArmGroup.getObjectByName('jixiebi')
    this.jxbGan = mechanicalArmGroup.getObjectByName('jixiebi004')
    this.scene.add(mechanicalArmGroup)
    let tray1 = tray.clone()
    tray1.position.set(-14, 0.5, trayZ)
    this.scene.add(tray1)
    for (let i = 0; i < goodsBoxList1.length; i++) {
      let hphClone = goodsBox.clone()
      let [x, y, z] = goodsBoxList1[i]
      hphClone.scale.y = 1.6
      hphClone.position.set(x, y, z)
      hphClone.name = `goodsBoxList-${i}`
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
        if(this.jxbNum === -1)this.tween1_down_jxbJia_jxbGan.stop()
      })
      .onComplete(() => {
        this.removeHph(`goodsBoxList-${this.jxbNum}`)
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
        this.mechanicalArmGroup.rotation.y = -Math.PI * angle / 180
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
        this.mechanicalArmGroup.rotation.y = -Math.PI * angle / 180
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
