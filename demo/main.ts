import rkTool from '../src/index'
const data = [
  {
    lonLat: [118.10006899260253, 24.473198023001295],
    id:'2'
  },
  {
    lonLat: [118.11170556859076, 24.42742749078093],
    id:'3'
  },
  {
    lonLat: [118.16135495947387, 24.46388876221071],
    id:'4'
  },
]
const result = rkTool.getCenterPointFromListOfCoordinates(data)
console.log(result)
