import {
  AmbientLight,
  Object3D,
  PointLight,
  SpotLight,
  DirectionalLight
} from 'three'

export const LightsList= []

export const ambientLight = new AmbientLight('rgb(255, 255, 255)', 1.6)

export const pointLight = new PointLight(
  'rgb(255, 0, 0)',
  0.7,
  50,
  0.1
)

pointLight.position.set(20, 20, 20)

export const spotLight = new SpotLight(
  'rgb(255, 255, 255)',
  0.9,
  8000,
  104.05,
  0.05,
  2
)

// spotLight.castShadow = true

spotLight.position.set(-50, 50, -50)
spotLight.position.set(0,300,-500)


export let Dlight = new DirectionalLight('#fafcfa',1.1)
Dlight.position.set(-620, 300, 0);
Dlight.shadow.camera.near = 20; //产生阴影的最近距离
Dlight.shadow.camera.far =1500; //产生阴影的最远距离
Dlight.shadow.camera.left = -400; //产生阴影距离位置的最左边位置
Dlight.shadow.camera.right = 400; //最右边
Dlight.shadow.camera.top = 100; //最上边
Dlight.shadow.camera.bottom = -100; //最下面

// 这两个值决定使用多少像素生成阴影 默认512
Dlight.shadow.mapSize.height = 800;
Dlight.shadow.mapSize.width = 800;

Dlight.castShadow = true

LightsList.push(ambientLight,Dlight,spotLight)
