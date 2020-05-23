/**
 * Created by lin on 2017/7/28.
 */
import * as moment from 'moment'
// import querystring from 'querystring'
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
  // /**
  //  * 删除请求参数的空值（lcq)
  //  * @param params
  //  * @param isJSON
  //  * @return {string | *}
  //  */
  // noNoneGetParams(params, isJSON) {
  //   const result = {}
  //   params = params || {}
  //
  //   for (const key in params) {
  //     if (params[key] !== '' &&
  //       params[key] !== null && typeof params[key] !== 'undefined'
  //       || params[key] === '0' || params[key] === 0 ) {
  //       result[key] = params[key]
  //     }
  //   }
  //   if (isJSON) {
  //     return result
  //   } else {
  //     return querystring.stringify(result)
  //   }
  // },
}
export default util
