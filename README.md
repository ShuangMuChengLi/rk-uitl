project-init 常用工具类

# Install
````
yarn add rk-util
````
# Usage
````
import rkUtil from 'rk-util'
rkUtil.addZero(24, 4) === '0024'
````
# API
````
  /**
   * 移除对象中值为空的键值对
   * @param obj
   */
  objectRemoveValueIsNull<T>(obj: T): T
  
  /**
   * 判断为空
   * @param arg1
   * @returns {boolean}
   */
  isEmpty<T>(arg1: T): boolean
    
  /**
     * 判断对象为无属性对象
     * @param e
     * @returns {boolean} 如果为空对象，返回true  如果为非空对象，返回false
     */
    isEmptyObject<T>(e: T): boolean
    
  /**
     * 计算年龄
     * @param birthday String '1988-10-06' |Date
     * @return String
     */
    getAge<T>(birthday: T): number
    
    
  /**
     * 回车键事件
     * @param e  事件
     * @param fn  回调函数
     * @param notEnterFn  非回车回调函数
     * @return boolean
     */
    keydownEnter(e: KeyboardEvent, fn?, notEnterFn?): void
    
  /**
     * 超出省略
     * @param s 字符串
     * @param len 最大长度
     * @returns {String}
     */
    beyondShowDot(s: string, len: number): string
    
  /**
     * 数字前补零(wjh)
     * @param num
     * @param length
     * @return {string}
     */
    addZero(num: number, length: number): string
    
  /**
     * 获取时间区间各个月份(wjh)
     * @param data type 日期数组
     * @return {Array}
     */
    getMonthArray<T>(data: Array<T>):  Array<string>
    
  /**
     * 删除请求参数的空值（lcq)
     * @param params
     * @param isJSON
     * @return {string | *}
     */
    noNoneGetParams<T>(params: T, isJSON = false): T | string
    
  /**
     * 将图片转成base64(lcq)
     * @param img(图片对象)
     * @returns {string}(base64)
     */
    picToBase64(img: HTMLImageElement): string
    
  /**
     * 将base64转成文件(lcq)
     * @param img,base64
     * @returns {File}
     */
    base64toFile<T>(img: string, name: string): File  
````