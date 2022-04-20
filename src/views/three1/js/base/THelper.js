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
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";

export const helperList = []
const axesHelper  = new AxesHelper(500)
const gridHelper = new GridHelper(500, 20, 'rgb(200, 200, 200)', 'rgb(100, 100, 100)')

export const pointLightHelper = new PointLightHelper(pointLight, pointLight.distance, pointLight.color)
export const spotLightHelper = new SpotLightHelper(spotLight, spotLight.color)
export const DLightHelper = new DirectionalLightHelper(Dlight,50,new Color(0,1,1))
helperList.push(axesHelper,DLightHelper)

export class Css2DLabel{
  constructor({className,style1,textContent} = {},...[x,y,z]) {
    let labelDiv = document.createElement('div')
    labelDiv.className = className || 'css2d_label'
    labelDiv.textContent = textContent
    labelDiv.style = style1 || 'margin-top:-1em'
    let label = new CSS2DObject(labelDiv)
    label.position.set(x,y,z)
    this.label = label
  }
  setLayer(num){
    this.label.layers.set(num)
  }
}
