/**
 * Created by lin on 2017/7/28.
 */
import * as moment from 'moment'
import * as querystring from 'querystring'
interface Coordinate {
  lon?: number;
  lat?: number;
  lonLat?: Array<number>;
}
export const util = {
  /**
   * 移除对象中值为空的键值对
   * @param obj
   */
  objectRemoveValueIsNull<T>(obj: T): T{
    for (const i in obj) {
      const item = obj[i]
      if (this.isEmpty(item)) {
        delete obj[i]
      }
    }
    return obj
  },
  /**
   * 判断为空
   * @param arg1
   * @returns {boolean}
   */
  isEmpty<T>(arg1: T): boolean {
    return !arg1 && typeof arg1 !== 'number' && typeof arg1 !== 'boolean'
  },
  /**
   * 判断对象为无属性对象
   * @param e
   * @returns {boolean} 如果为空对象，返回true  如果为非空对象，返回false
   */
  isEmptyObject<T>(e: T): boolean {
    return Object.getOwnPropertyNames(e).length === 0
  },
  /**
   * 计算年龄
   * @param birthday String '1988-10-06' |Date
   * @return String
   */
  getAge<T>(birthday: T): number{
    const birthdayTimestamp = moment(birthday, 'YYYY-MM-DD').toDate().getTime()
    const nowTimestamp = new Date().getTime()
    const tempTime: number = nowTimestamp - birthdayTimestamp
    return Math.floor(tempTime / 1000 / 60 / 60 / 24 / 365)
  },
  /**
   * 回车键事件
   * @param e  事件
   * @param fn  回调函数
   * @param notEnterFn  非回车回调函数
   * @return boolean
   */
  keydownEnter(e: KeyboardEvent, fn?, notEnterFn?): void {
    const code = e.code
    if (code === 'Enter') {
      fn()
    }else {
      notEnterFn()
    }
  },
  /**
   * 超出省略
   * @param s 字符串
   * @param len 最大长度
   * @returns {String}
   */
  beyondShowDot(s: string, len: number): string{
    if (s) {
      const stringLength = s.length
      if (stringLength <= len) {
        return s
      } else {
        return s.substr(0, len) + '...'
      }
    } else {
      return ''
    }
  },
  /**
   * 数字前补零(wjh)
   * @param num
   * @param length
   * @return {string}
   */
  addZero(num: number, length: number): string{
    return (Array(length).join('0') + num).slice(-length)
  },
  /**
   * 获取时间区间各个月份(wjh)
   * @param data type 日期数组
   * @return {Array}
   */
  getMonthArray<T>(data: Array<T>):  Array<string>{
    const timeline = []
    let minMonth: any = null
    let maxMonth: any = null
    for (const item of data) {
      const itemMoment = moment(item)
      if (!minMonth) {
        minMonth = itemMoment
        maxMonth = itemMoment
        continue
      }
      if (itemMoment.isBefore(minMonth)) {
        minMonth = itemMoment
        continue
      }
      if (itemMoment.isAfter(maxMonth)) {
        maxMonth = itemMoment
      }
    }
    const formatMinMonth: string = minMonth.format('YYYY-MM')
    let formatMaxMonth: string = maxMonth.format('YYYY-MM')
    timeline.push(formatMaxMonth)
    while (formatMaxMonth !== formatMinMonth) {
      const date: any = moment(formatMaxMonth).subtract(1, 'month')
      const dateMonthYear: string = date.format('YYYY-MM')
      timeline.push(dateMonthYear)
      formatMaxMonth = dateMonthYear
    }
    timeline.reverse()
    return timeline
  },
  /**
   * 删除请求参数的空值（lcq)
   * @param params
   * @param isJSON
   * @return {string | *}
   */
  noNoneGetParams<T>(params: T, isJSON = false): T | string{
    if(!params){
      return ''
    }

    const result: T = {...params}
    for (const key in params) {
      if(!Object.prototype.hasOwnProperty.call(params, key))continue

      if (util.isEmpty(params[key])) {
        delete result[key]
      }
    }
    if (isJSON) {
      return result
    } else {
      return querystring.stringify(result)
    }
  },
  /**
   * 将图片转成base64(lcq)
   * @param img(图片对象)
   * @returns {string}(base64)
   */
  picToBase64(img: HTMLImageElement): string{
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)
    return canvas.toDataURL()
  },
  /**
   * 将base64转成文件(lcq)
   * @param img string base64
   * @param name string filename
   * @returns {File}
   */
  base64toFile<T>(img: string, name: string): File{
    const bstr: string = atob(img.split(',')[1])
    const rules = new RegExp(/:(.*?);/)
    const mime = rules.exec(img)[1]
    // console.log(rules.exec(img))
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--){
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], name, {type:mime})
  },
  /**
   * 二维数组穷尽组合游标算法函数
   * @param list  [ ['a1','a2'], ['b1','b2']]
   * @return {any[]}  [ [ 'a1', 'b1' ], [ 'a1', 'b2' ], [ 'a2', 'b1' ], [ 'a2', 'b2' ] ]
   * 1、计算出所有组合的长度length，初始化length长度的结果数组
   * 2、初始化游标数组，长度为list.length，每一项初始化为0，用于记录每一结果项的list来源项的下标
   * 3、开始循环结果数组（循环1），根据游标数组，获取要填入结果数组的list下标，从而获取list项，然后填入结果数组
   * 4、更新游标数组，更新为循环1下一次循环所要填入的下标
   * 5、直到循环1循环结束，算法结束
   */
  combination<T>(list: Array<Array<T>>): Array<Array<T>>{
    const pointList = [] // 游标列表
    const maxLengthList = [] // 二维列表每一项的长度数组列表
    let length = 1
    // 构建游标列表和二维列表每一项的长度数组列表
    for(let groupIndex = 0; groupIndex < list.length ; groupIndex ++){
      const group = list[groupIndex]
      maxLengthList.push(group.length)
      length = length * group.length
      pointList.push(0)
    }
    /**
     * 游标列表更新函数
     */
    function updatePointList(): void {
      for(let i = pointList.length - 1; i > -1; i--){
        if(pointList[i] < maxLengthList[i] - 1){
          pointList[i] ++
          break
        }

        pointList[i] = 0
      }
    }
    const result = []// 结果队列
    for(let resultIndex = 0 ; resultIndex < length ; resultIndex ++){
      result[resultIndex] = []
      // 根据游标队列定位到各项item的位置
      for(let pointIndex = 0 ; pointIndex < pointList.length ; pointIndex ++){
        const point = pointList[pointIndex]
        result[resultIndex].push(list[pointIndex][point])
      }
      updatePointList()

    }
    return result
  },
  /**
   * 树形筛选
   * @param tree
   * [
   {
            id: 1,
            children:[]
        }
   ]
   * @param filterCondition   要筛选出的id列表 [221, 121];
   * @returns {[]}
   */
  treeFilter<T>(tree: Array<T>, filterCondition: Array<string>): Array<T>{
    function throughFilter(treePart): Array<T> {
      const result = []
      for(const item of treePart){
        if(filterCondition.indexOf(item.id) !== -1){
          result.push(item)
          continue
        }

        if(!item.children || !item.children.length){
          continue
        }

        const childrenResult = throughFilter(item.children)
        if(childrenResult.length > 0){
          item.children = childrenResult
          result.push(item)
        }
      }
      return result
    }
    return throughFilter(tree)
  },

  /**
   * 将数字每千位逗号分隔
   * @param data string| number
   * @return string
   */
  toThousand(data: string | number): string {
    if (!data) {
      return ''
    }
    let value = data.toString()
    let trans = ''
    while (value.length > 3) {
      trans = ',' + value.slice(-3) + trans
      value = value.slice(0, value.length - 3)
    }
    return value + trans
  },
  /**
   * 根据一组经纬度获取中心点
   * http://www.geomidpoint.com/calculation.html
   * @param coordinateList
   */
  getCenterPointFromListOfCoordinates(coordinateList: Array<Coordinate>): Coordinate{
    const total = coordinateList.length
    let X = 0
    let Y = 0
    let Z = 0
    for(const coordinate of coordinateList){
      let lon = coordinate.lon || coordinate.lonLat[0]
      let lat = coordinate.lat || coordinate.lonLat[1]
      lat = lat * Math.PI / 180
      lon = lon * Math.PI / 180
      X += Math.cos(lat) * Math.cos(lon)
      Y += Math.cos(lat) * Math.sin(lon)
      Z += Math.sin(lat)
    }
    X = X / total
    Y = Y / total
    Z = Z / total
    const lon2 = Math.atan2(Y, X)
    const hyp = Math.sqrt(X * X + Y * Y)
    const lat2 = Math.atan2(Z, hyp)
    const lonLat = [lon2 * 180 / Math.PI, lat2 * 180 / Math.PI]
    return {
      lon: lonLat[0],
      lat: lonLat[1],
      lonLat: lonLat
    }
  }
}
export default util
