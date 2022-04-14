import * as THREE from "three";
import {Color} from "three";

let sceneIsCube = false
export default function Event(TE) {
  let SELECTED;
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()
  function onMouseClick(event) {
    //将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera(mouse, TE.camera);
    // 获取raycaster直线和所有模型相交的数组集合
    let intersects = raycaster.intersectObjects(TE.scene.children, true);
    if (intersects.length > 0) {
      //获取第一个物体
      if (SELECTED !== intersects[0].object) {
        if(intersects[0]?.object?.name?.includes('zbhj'))return;
        if (SELECTED) SELECTED.material.color && SELECTED.material.color.setHex(SELECTED.currentHex);
        SELECTED = intersects[0].object;
        SELECTED.currentHex = SELECTED.material.color&&SELECTED.material.color.getHex();//记录当前选择的颜色
        //改变物体的颜色(红色)
        SELECTED.material.color && SELECTED.material.color.set('yellow');
        TE.outlinePass.selectedObjects = [intersects[0].object]
        if (SELECTED.name) { //zbhj_dm1 zbhj_F2
          console.log(intersects[0]&&intersects[0].object.name);
          let position = TE.getPosition(intersects[0].point)
          window.modelPoint = intersects[0].point
          window._event.emit('showTip', SELECTED.name,position)
        } else {
          window._event.emit('showTip')
          window.modelPoint = null
        }
      }
    } else {
      // document.body.style.cursor= 'auto';
      if (SELECTED) SELECTED.material.color&&SELECTED.material.color.set(SELECTED.currentHex);//恢复选择前的默认颜色
      SELECTED = null;
      TE.outlinePass.selectedObjects = []
      window._event.emit('showTip')
      window.modelPoint = null
    }
  }


  window.addEventListener('click', onMouseClick, false);

  // let sceneChildren = []
  // let _tray1 = TE.scene.getObjectByName('底盘1')
  // let _tray2 = TE.scene.getObjectByName('底盘2')
  // let horseActionIsPlay = false
  // let horseActionPlayTime = 1.5
  // let group = new THREE.Group()
  // group.add(_tray1)
  // group.add(_tray2)
  // TE.scene.add(group)
  window.addEventListener('keydown',function (e){
    switch(e.keyCode){
      // case 87: group.position.z-=1;break;
      // case 83: group.position.z+=1;break;
      // case 65: group.position.x-=1;break;
      // case 68: group.position.x=1;break;
      case 32:
        // if(!sceneIsCube){
        //   TE.scene.background = TE.textureCube
        //   sceneIsCube = true
        //   sceneChildren =  TE.scene.children
        //   TE.scene.children = []
        // }else{
        //   TE.scene.background = new Color( 200/255,200/255,200/255 );
        //   sceneIsCube = false
        // }
        break
      case 38:
        // if(sceneChildren.length !== 0){
        //   TE.scene.children = sceneChildren
        // }else{
        //
        // }
        // sceneChildren.length !== 0 &&TE.scene.children = sceneChildren
        // if(horseActionIsPlay){
        //   horseActionPlayTime <= 0.1
        //     ? horseActionPlayTime = 0.1
        //     : horseActionPlayTime -= 0.1;
        //   TE.horseAction.setDuration(horseActionPlayTime).play()
        //   // horseActionPlayTime = 0.5
        //   // TE.horseAction.setDuration(horseActionPlayTime).play()
        // }
        break
      case 40:
        // TE.buildGroup.visible = !TE.buildGroup.visible
        // if(horseActionIsPlay){
        //   horseActionPlayTime >= 4
        //     ? horseActionPlayTime = 4
        //     : horseActionPlayTime += 0.1;
        //   TE.horseAction.setDuration(horseActionPlayTime).play()
        // }
        break
      case 13:
        TE.isPlay = !TE.isPlay
    }
  })

}
