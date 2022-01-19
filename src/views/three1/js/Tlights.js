import {
  AmbientLight,
  Object3D,
  PointLight,
  SpotLight
} from 'three'

export const LightsList= []

export const ambientLight = new AmbientLight('rgb(255, 255, 255)', 0.6)

export const pointLight = new PointLight(
  'rgb(255, 0, 0)',
  0.7,
  50,
  0.1
)

pointLight.position.set(20, 20, 20)

export const spotLight = new SpotLight(
  'rgb(255, 255, 255)',
  2,
  8000,
  104.05,
  0.05,
  2
)

spotLight.castShadow = true

spotLight.position.set(-50, 50, -50)
spotLight.position.set(0,300,-500)



LightsList.push(ambientLight, pointLight, spotLight)
