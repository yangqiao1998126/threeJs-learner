import {
  AxesHelper,
  GridHelper,
  Object3D,
  PointLightHelper,
  SpotLightHelper
} from 'three'

import { pointLight, spotLight } from './Tlights'

export const helperList = []

const axesHelper  = new AxesHelper(500)
const gridHelper = new GridHelper(500, 20, 'rgb(200, 200, 200)', 'rgb(100, 100, 100)')



export const pointLightHelper = new PointLightHelper(pointLight, pointLight.distance, pointLight.color)

export const spotLightHelper = new SpotLightHelper(spotLight, spotLight.color)

helperList.push(axesHelper, gridHelper, pointLightHelper, spotLightHelper)
