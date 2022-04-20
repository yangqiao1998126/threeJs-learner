import {Texture, TextureLoader, RepeatWrapping} from "three";

const textureLoader = new TextureLoader()


export const pictureTexture = textureLoader.load('/1.png')
export const shadow = textureLoader.load('/model/img/ferrari_ao.png');
// export const fontLoader1 = fontLoader.load('/model/font.json')
// export const cylinderTexture = textureLoader.load('/img/t2.jpeg')
// cylinderTexture.wrapS = cylinderTexture.wrapT = RepeatWrapping; //每个都重复
// cylinderTexture.repeat.set(1, 1);
// cylinderTexture.needsUpdate = true;

// export const cylinderTexture = (url = '/img/t2.jpeg') => {
//   const cylinderTexture = textureLoader.load(url)
//   cylinderTexture.wrapS = cylinderTexture.wrapT = RepeatWrapping; //每个都重复
//   cylinderTexture.repeat.set(1, 1);
//   cylinderTexture.needsUpdate = true;
//   return cylinderTexture
// }

export const cylinderTexture = (url = '/img/t2.jpeg') => {
  // const cylinderTexture = textureLoader.load(url)
  // cylinderTexture.wrapS = cylinderTexture.wrapT = RepeatWrapping; //每个都重复
  // cylinderTexture.repeat.set(1, 1);
  // cylinderTexture.needsUpdate = true;
  // return cylinderTexture
  return textureLoader.loadAsync(url)
    .then(res => {
      let cylinderTexture = res
      cylinderTexture.wrapS = cylinderTexture.wrapT = RepeatWrapping; //每个都重复
      cylinderTexture.repeat.set(1, 1);
      cylinderTexture.needsUpdate = true;
      return cylinderTexture
    })
}
