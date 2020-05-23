/**
 * Created by lin on 2017/7/28.
 */

import moment from 'moment';
import _ from 'lodash';
import querystring from 'querystring';
import {mathUtil} from './math-util.js';
export const util = {
  /**
     * 移除对象中值为空的键值对
     * @param obj
     */
  objectRemoveValueIsNull(obj) {
    for (let i in obj) {
      let item = obj[i];
      if (this.isNull(item)) {
        delete obj[i];
      }
    }
  },
  /**
     * 判断为空
     * @param arg1
     * @returns {boolean}
     */
  isNull(arg1) {
    return !arg1 && arg1 !== 0 && typeof arg1 !== 'boolean';
  },
  /**
     * 判断对象为无属性对象
     * @param e
     * @returns {boolean} 如果为空对象，返回true  如果为非空对象，返回false
     */
  isEmptyObject(e) {
    return Object.getOwnPropertyNames(e).length === 0;
  },
  /**
     * 计算年龄
     * @param birthday   1999-10-08 |Date
     * @returns {Number}
     */
  getAge(birthday) {
    let birthdayTimestamp = moment(birthday, 'YYYY-MM-DD').toDate().getTime();
    let nowTimestamp = new Date().getTime();
    let tempTime = nowTimestamp - birthdayTimestamp;
    return Math.floor(tempTime / 1000 / 60 / 60 / 24 / 365);
  },
  /**
     * 回车键事件
     * @param e  事件
     * @param fn  回调函数
     */
  keydownEnter(e, fn) {
    let theEvent = e || window.event;
    let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code === 13) {
      fn();
    }
  },
  /**
     * 超出省略
     * @param s 字符串
     * @param len 最大长度
     * @returns {String}
     */
  beyondShowDot(s, len) {
    if (s) {
      let stringLength = s.length;
      if (stringLength <= len) {
        return s;
      } else {
        return s.substr(0, len) + '...';
      }
    } else {
      return '';
    }
  },
  /**
   * 清除字符串左右两边空格
   * @param str
   * @returns {XML|string|*}
   */
  trim(str) {
    str = _.trim(str);
    str = str.replace(/\u202D/g, '');
    str = str.replace(/\u202C/g, '');
    return str;
  },
  /**
   * 验证返回值 200 正常
   * 用于正常情况下的  data数据不为空   对data做验证
    */

  verifyResponse(data) {
    if (data && data.data && data.data.code) {
      if (data.data.code === 200) {
        if (data.data.data || data.data.data === 0) {
          return data.data.data;
        } else {
          return false;
        }
      } else {
        return false;
      }

    } else {
      return false;
    }
  },
  noNoneGetParams(params, isJSON) {
    let result = {};
    params = params || {};

    for (let key in params) {
      if (params[key] !== '' &&
        params[key] !== null && typeof params[key] !== 'undefined'
        || params[key] === '0' || params[key] === 0 ) {
        result[key] = params[key];
      }
    }
    if (isJSON) {
      return result;
    } else {
      return querystring.stringify(result);
    }

  },
  // 数字前补零
  addZero(num, length) {
    return (Array(length).join(0) + num).slice(-length);
  },
  // 获取时间区间各个月份
  getMonthArray(data) {
    let timeline = [];
    let minMonth = null;
    let maxMonth = null;
    for (let item of data) {
      let itemMoment = moment(item);
      if (!minMonth) {
        minMonth = itemMoment;
        maxMonth = itemMoment;
        continue;
      }
      if (itemMoment.isBefore(minMonth)) {
        minMonth = itemMoment;
        continue;
      }
      if (itemMoment.isAfter(maxMonth)) {
        maxMonth = itemMoment;
      }
    }
    let formatMinMonth = minMonth.format('YYYY-MM');
    let formatMaxMonth = maxMonth.format('YYYY-MM');
    timeline.push(formatMaxMonth);
    while (formatMaxMonth !== formatMinMonth) {
      let date = moment(formatMaxMonth).subtract(1, 'month');
      let dateMonthYear = date.format('YYYY-MM');
      timeline.push(dateMonthYear);
      formatMaxMonth = dateMonthYear;
    }
    timeline.reverse();
    return timeline;
  },

  /**
     * //跳转路由
     * @param url vue路由
     * @param basePage  html页面  默认index.html
     * @param self    布尔型数据 是否当前页面打开  默认新窗口打开
     */
  async goto(url, basePage, self) {
    let fn = ()=>{
      let sUrl = '';
      if(basePage){
        sUrl = basePage;
      }else{
        sUrl = '/index.html';
      }
      if(!self){
        window.open(sUrl + '#' + url);
      }else{
        window.location.href = sUrl + '#' + url;
      }
    };
    fn();
  },

  setTitle(s) {
    document.title = s;
  },
  toThousand(data) {
    return mathUtil.toThousand(data);
  },


  /**
   * 处理异常  登录过期  跳转登录页
   * @param e
   * @returns {boolean}
   */
  handleError(e) {
    if (e.response && e.response.status) {
      if (e.response.status === 401) {
        // if (window.location.href.indexOf("/#/login") === -1) {
        //   this.vue.$message.error("登录过期，请重新登录");
        //   storageUtil.setSession("historyUrl", window.location.href);
        //   window.location.href = "/#/login";
        // }
      }
    }
    // console.error(e);
    return false;
  },
  /**
   * 事件防抖动，用于mousemove scroll等频繁触发的事件的优化
   * @param action  事件要执行方法
   * @param delay  延时
   * @return {Function}
   */
  debounce(action, delay){
    let timer = null;
    return function() {
      let self = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        action.apply(self, args);
      }, delay);
    };
  },
  /**
   * 事件节流，用于mousemove scroll等频繁触发的事件的优化
   * @param action  事件要执行方法
   * @param delay  延时
   * @return {Function}
   */
  throttle(action, delay){
    let statTime = 0;
    return function() {
      let currTime = +new Date();
      if (currTime - statTime > delay) {
        action.apply(this, arguments);
        statTime = currTime;
      }
    };
  },
  /**
   * 二维数组排列组合函数（兼容上一版本，建议直接用mathUtil）
   * @param list  [ ['a1','a2'], ['b1','b2']]
   * @return {any[]}  [ [ 'a1', 'b1' ], [ 'a1', 'b2' ], [ 'a2', 'b1' ], [ 'a2', 'b2' ] ]
   */
  combination(list){
    // 兼容上一版本，建议直接用mathUtil
    return mathUtil.combination(list);
  },
  /**
   * 树形筛选（兼容上一版本，建议直接用mathUtil）
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
  treeFilter(tree, filterCondition) {
    return mathUtil.treeFilter(tree, filterCondition);
  },
  /**
   * 将图片转成base64
   * @param img(图片对象)
   * @returns {string}(base64)
   */
  picToBase64(img) {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    let dataUrl = canvas.toDataURL();
    return dataUrl;
  },
  /**
   * 将base64转成文件
   * @param img,base64
   * @returns {File}
   */
  base64toFile(img, name){
    let bstr = atob(img.split(',')[1]);
    let mime = img.split(',')[0].match(/:(.*?);/)[1];
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    let file = new File([u8arr], name, {type:mime});
    return file;
  },
  use(vue) {
    this.vue = vue;
  },
  vue: null
};
