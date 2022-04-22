export const modelObjs = {
  dimain:'/model/glb1/dimian.glb',
  zhoubianjianzhu:'/model/glb1/zhoubianjianzhu.glb',
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
  jixiebi:'/model/glb1/jixiebi.glb',
  low_building_1:{
    mtlUrl:'/model/obj/low_building_1/low_building_1.mtl',
    objUrl:'/model/obj/low_building_1/low_building_1.obj'
  },
  low_building_2:{
    mtlUrl:'/model/obj/low_building_2/low_building_2.mtl',
    objUrl:'/model/obj/low_building_2/low_building_2.obj'
  }
}
export let guiObj = {
  spotLightGui:{
    // x:0,
    "平行光颜色":'#fff',
    "平行光强度":1,
  },
  ambientLightGui:{
    "环境光颜色":'#fff',
    "环境光强度":1,
  },
  "是否显示光源辅助线":true,
  "抗锯齿Level":1
  // "轨道控制器旋转":false
}
export let guiFun = gui => {
  gui.domElement.parentNode.style.zIndex = 10
  gui.domElement.style="position:absolute;top:0px;left:0px;"
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
  return gui
}
export let xhwData = [
  {
    distance:160,
    num:5,
    initPosition:[184.5, 4.2, 93.5],
    endPostion:[66, 4.2, 93.5],
    speed:0.07
  },
  {
    distance:167,
    num:10,
    initPosition:[184.5, 4.2, 80.8],
    endPostion:[9, 4.2, 80.8],
    speed:0.2
  },
  {
    distance:-36,
    num:7,
    initPosition:[-26, 4, 20.5],
    endPostion:[-97, 4, 20.5],
    speed:0.15
  },
  {
    distance:-40.2,
    num:5,
    initPosition:[-26, 4, -69.3],
    endPostion:[-97, 4, -69.3],
    speed:0.11
  },

]
