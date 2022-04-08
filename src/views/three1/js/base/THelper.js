import {
  AxesHelper,
  GridHelper,
  Object3D,
  PointLightHelper,
  SpotLightHelper,
  DirectionalLightHelper,
  Color
} from 'three'

import { pointLight, spotLight ,Dlight} from './Tlights'

export const helperList = []

const axesHelper  = new AxesHelper(500)
const gridHelper = new GridHelper(500, 20, 'rgb(200, 200, 200)', 'rgb(100, 100, 100)')



export const pointLightHelper = new PointLightHelper(pointLight, pointLight.distance, pointLight.color)


export const spotLightHelper = new SpotLightHelper(spotLight, spotLight.color)
export const DLightHelper = new DirectionalLightHelper(Dlight,50,new Color(0,1,1))

helperList.push(axesHelper,DLightHelper)
