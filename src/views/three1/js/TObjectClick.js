import * as THREE from "three";

export default function Event(TE) {
  let SELECTED;
  var raycaster = new THREE.Raycaster()
  var mouse = new THREE.Vector2()

  function onMouseClick(event) {

    //将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera(mouse, TE.camera);

    // 获取raycaster直线和所有模型相交的数组集合
    var intersects = raycaster.intersectObjects(TE.scene.children, true);
    // console.log(intersects);
    // console.log(intersects[0]&&intersects[0].object.name);
    // if(intersects.length && intersects[0].object.name === 'Box1'){
    //
    //   intersects[0].object.material.color.set('green');
    // }else {
    //   intersects[0].object.material.color.set('yellow');
    // }
    if (intersects.length > 0) {

      //获取第一个物体
      if (SELECTED !== intersects[0].object) {
        //鼠标的变换
        // document.body.style.cursor='pointer';
        /*intersects[ 0 ].object.material.transparent=true;//透明度的变化
         intersects[ 0 ].object.material.opacity=0.5;*/
        if (SELECTED) SELECTED.material.color && SELECTED.material.color.setHex(SELECTED.currentHex);
        SELECTED = intersects[0].object;
        SELECTED.currentHex = SELECTED.material.color&&SELECTED.material.color.getHex();//记录当前选择的颜色
        //改变物体的颜色(红色)
        SELECTED.material.color && SELECTED.material.color.set('yellow');
        TE.outlinePass.selectedObjects = [intersects[0].object]
        if (SELECTED.name) {
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

    //将所有的相交的模型的颜色设置为红色for ( var i = 0; i < intersects.length; i++ ) {

    // intersects[ i ].object.material.color.set( 0xff0000 );

  }


  window.addEventListener('click', onMouseClick, false);


  let _tray1 = TE.scene.getObjectByName('底盘1')
  let _tray2 = TE.scene.getObjectByName('底盘2')
  let horseActionIsPlay = false
  let horseActionPlayTime = 1.5
  let group = new THREE.Group()
  group.add(_tray1)
  group.add(_tray2)
  TE.scene.add(group)
  window.addEventListener('keydown',function (e){
    switch(e.keyCode){
      case 87: group.position.z-=1;break;
      case 83: group.position.z+=1;break;
      case 65: group.position.x-=1;break;
      case 68: group.position.x=1;break;
      case 32:
        if(!horseActionIsPlay){
          TE.horseAction.setDuration(horseActionPlayTime).play()
          horseActionIsPlay = true
        }else{
          TE.horseAction.stop()
          horseActionIsPlay = false
        }
        break
      case 38:
        if(horseActionIsPlay){
          horseActionPlayTime <= 0.1
            ? horseActionPlayTime = 0.1
            : horseActionPlayTime -= 0.1;
          TE.horseAction.setDuration(horseActionPlayTime).play()
          // horseActionPlayTime = 0.5
          // TE.horseAction.setDuration(horseActionPlayTime).play()
        }
        break
      case 40:
        if(horseActionIsPlay){
          horseActionPlayTime >= 4
            ? horseActionPlayTime = 4
            : horseActionPlayTime += 0.1;
          TE.horseAction.setDuration(horseActionPlayTime).play()
        }
    }
  })

}
