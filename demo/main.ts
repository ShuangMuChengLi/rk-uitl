import rkTool from '../src/index'
import testImg from './test.jpg'
const img = new Image()
img.width = 100
img.height = 100
img.src = testImg
img.onload = (): void=>{
  const result = rkTool.picToBase64(img)
  console.log(result)
}
