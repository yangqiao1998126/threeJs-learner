import * as THREE from "three";
export default function Event(TE){
  let SELECTED;
  var raycaster = new THREE.Raycaster()
  var mouse = new THREE.Vector2()

  function onMouseClick(event){

    //将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY/window.innerHeight) *2 + 1

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera( mouse, TE.camera );

    // 获取raycaster直线和所有模型相交的数组集合
    var intersects = raycaster.intersectObjects( TE.scene.children ,true);
    console.log(intersects);
    console.log(intersects[0].object.name);
    // if(intersects.length && intersects[0].object.name === 'Box1'){
    //
    //   intersects[0].object.material.color.set('green');
    // }else {
    //   intersects[0].object.material.color.set('yellow');
    // }
    if ( intersects.length > 0 ) {

      //获取第一个物体
      if (SELECTED !== intersects[0].object) {
        //鼠标的变换
        // document.body.style.cursor='pointer';
        /*intersects[ 0 ].object.material.transparent=true;//透明度的变化
         intersects[ 0 ].object.material.opacity=0.5;*/
        if (SELECTED) SELECTED.material.color.setHex(SELECTED.currentHex);
        SELECTED = intersects[0].object;
        SELECTED.currentHex = SELECTED.material.color.getHex();//记录当前选择的颜色
        //改变物体的颜色(红色)
        SELECTED.material.color.set('yellow');
      TE.outlinePass.selectedObjects = [intersects[0].object]
      }
    } else {
      // document.body.style.cursor= 'auto';
      if (SELECTED) SELECTED.material.color.set(SELECTED.currentHex);//恢复选择前的默认颜色
      SELECTED = null;
      TE.outlinePass.selectedObjects = []
    }

    //将所有的相交的模型的颜色设置为红色for ( var i = 0; i < intersects.length; i++ ) {

    // intersects[ i ].object.material.color.set( 0xff0000 );

  }


window.addEventListener( 'click', onMouseClick, false );
}
