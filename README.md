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
    combination<T>(list: Array<Array<T>>): Array<Array<T>>
  
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
    treeFilter<T>(tree:Array<T>, filterCondition:Array<string>): Array<T>
    
  /**
     * 将数字每千位逗号分隔
     * @param data string| number
     * @return string
     */
    toThousand(data:string | number):string
````