import { TextureLoader, RepeatWrapping} from "three";

const textureLoader = new TextureLoader()
export const pictureTexture = textureLoader.load('/1.png')
export const shadow = textureLoader.load('/model/img/ferrari_ao.png');

export const cylinderTexture = (url = '/img/t2.jpeg') => {
  return textureLoader.loadAsync(url)
    .then(res => {
      let cylinderTexture = res
      cylinderTexture.wrapS = cylinderTexture.wrapT = RepeatWrapping; //每个都重复
      cylinderTexture.repeat.set(1, 1);
      cylinderTexture.needsUpdate = true;
      return cylinderTexture
    })
}

export let tubeTexture = new Promise((resolve => {
  textureLoader.loadAsync('/img/jt1.png').then(res => {
    res.wrapS = RepeatWrapping
    res.wrapT = RepeatWrapping
    res.repeat.x = 50;
    res.repeat.y = 2;
    res.offset.y = 0.5;
    resolve(res)
  })
}))
