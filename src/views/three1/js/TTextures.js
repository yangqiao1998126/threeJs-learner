import { Texture, TextureLoader } from "three";

const textureLoader = new TextureLoader()

export const pictureTexture = textureLoader.load('/1.png')
export const shadow = textureLoader.load( '/model/img/ferrari_ao.png' );
