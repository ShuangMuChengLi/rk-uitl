import util from '../src/index'
describe('util.isEmpty', () => {
  test('empty string', () => {
    const result = util.isEmpty( '')
    expect(result).toBe(true)
  })
  test('number', () => {
    const result = util.isEmpty(0)
    expect(result).toBe(false)
  })
  test('boolean', () => {
    const result = util.isEmpty(false)
    expect(result).toBe(false)
  })
})

describe('util.objectRemoveValueIsNull', () => {
  test('empty string', () => {
    const result = util.objectRemoveValueIsNull({ name: ''})
    expect(result.name).toBe(undefined)
  })
  test('0', () => {
    const result = util.objectRemoveValueIsNull({ name: 0})
    expect(result.name).toBe(0)
  })
  test('boolean', () => {
    const result = util.objectRemoveValueIsNull({ name: false})
    expect(result.name).toBe(false)
  })
})

describe('util.isEmptyObject', () => {
  test('string', () => {
    const result = util.isEmptyObject('hello world')
    expect(result).toBe(false)
  })
  test('string', () => {
    const result = util.isEmptyObject('')
    expect(result).toBe(false)
  })
  test('{count:1}', () => {
    const result = util.isEmptyObject({count: 1})
    expect(result).toBe(false)
  })
  test('[]', () => {
    const result = util.isEmptyObject([])
    expect(result).toBe(false)
  })
  test('new fn()', () => {
    function fn(): void{}
    const result = util.isEmptyObject(new fn())
    expect(result).toBe(true)
  })
  test('{}', () => {
    const result = util.isEmptyObject({})
    expect(result).toBe(true)
  })
})

describe('util.getAge', () => {
  test('1999-10-08', () => {
    const result = util.getAge('1999-10-08')
    expect(result).toBe(20)
  })
  test('1999-10-08 12:10:10', () => {
    const result = util.getAge('1999-10-08 12:10:10')
    expect(result).toBe(20)
  })
  test('new Date()', () => {
    const result = util.getAge(new Date())
    expect(result).toBe(0)
  })
})
describe('util.keydownEnter', () => {
  test('enter', (done) => {
    const event = new KeyboardEvent('keydown',{code:'Enter'})
    util.keydownEnter(event, ()=>{
      done()
    })
  })
  test('not enter', (done) => {
    const event = new KeyboardEvent('keydown',{code: 'KeyE'})
    util.keydownEnter(event, null, ()=>{
      done()
    })
  })
})

describe('util.noNoneGetParams', () => {
  test('default', () => {
    const jsonData = {
      name: 'George',
      sex: 1,
      age: 20
    }
    const result = util.noNoneGetParams(jsonData)
    expect(result).toEqual('name=George&sex=1&age=20')
  })
  test('empty object', () => {
    const jsonData = {
    }
    const result = util.noNoneGetParams(jsonData)
    expect(result).toEqual('')
  })
  test('has boolean', () => {
    const jsonData = {
      is: true
    }
    const result = util.noNoneGetParams(jsonData)
    expect(result).toEqual('is=true')
  })
  test('null', () => {
    const jsonData = null
    const result = util.noNoneGetParams(jsonData)
    expect(result).toEqual('')
  })
  test('isJSON', () => {
    interface Person{
      name: string;
      sex: number;
      age: number;
    }
    const jsonData: Person = {
      name: 'George',
      sex: 1,
      age: null
    }
    const result = util.noNoneGetParams(jsonData, true) as Person
    expect(result.name).toEqual('George')
  })
})

describe('util.beyondShowDot', () => {
  test('string length > 2', () => {
    expect(util.beyondShowDot('beyondShowDot', 2)).toBe('be...')
  })

  test('string none', () => {
    expect(util.beyondShowDot('', 2)).not.toBe('be...')
  })
  test('string none', () => {
    expect(util.beyondShowDot('', 2)).toBe('')
  })
  test('string length > 14', () => {
    expect(util.beyondShowDot('beyondShowDot', 14)).toBe('beyondShowDot')
  })
  test('string length > 14', () => {
    expect(util.beyondShowDot('beyondShowDot', 14)).not.toBe('beyon...')
  })
})

describe('util.addZero', () => {
  test('input number 24 leng 4', () => {
    expect(util.addZero(24, 4)).toBe('0024')
  })
  test('input number 24 leng 3', () => {
    expect(util.addZero(24, 3)).not.toBe('0024')
  })
})

describe('util.getMonthArray', () => {
  test('input monthList [201811, 202012]', () => {
    expect(util.getMonthArray(['201811', '201902'])).toStrictEqual(['2018-11', '2018-12', '2019-01', '2019-02'])
  })
  test('input monthList [201811, 201810, 201902, 201901]', () => {
    expect(util.getMonthArray(['201811', '201810', '201902', '201901'])).toStrictEqual(['2018-10','2018-11', '2018-12', '2019-01', '2019-02'])
  })
  test('input monthList new Date()', () => {
    const dateList = [new Date('2018-11-01'), new Date('2018-10-01'), new Date('2019-01-01')]
    expect(util.getMonthArray(dateList)).toStrictEqual(['2018-10','2018-11', '2018-12', '2019-01'])
  })
})
// describe('util.base64toFile', () => {
//   test('base64toFile', () => {
//     const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAACGCAIAAAA99GE/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUEzMkFCRjI4MDRFMTFFQUI2MkFBMkE3QjZCN0ZEODAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUEzMkFCRjM4MDRFMTFFQUI2MkFBMkE3QjZCN0ZEODAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QTMyQUJGMDgwNEUxMUVBQjYyQUEyQTdCNkI3RkQ4MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QTMyQUJGMTgwNEUxMUVBQjYyQUEyQTdCNkI3RkQ4MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtoLUKwAAAFPSURBVHja7NtJCsIwGAbQKHGCgu69gCfwNF7fAwgFKxaxioIDSLuIcXjfIpsO+XmENJCmt1iuQqLEQaj3Le9drzfz+TRkzLXafpD7ECFChAgRIkSIECFChAgRIkSIEBEiRIgQIUKECBEiRIgQIUKECBEhQoQIkW8QiUUxnM2a9isUbquNp/84U0iPJ71zG6pdqwdG40SVdK02tv8Jt1MO1bbpoGnbvn9XhXqUS+S22pioj7osT6MjDXfSas2svjVEiBAhQuTt69csvZblZZ1SFIOuV40RIkSIECFChAgRIkSECBEiRIgQIUKECBEiRIgQ+a/k2dN7vVmXZSvPGCFChAgRIkSIECFChAgRIkSICBEiRIh8uIgz4U/SzoQ/xJnwxzgTbmYlQoSIECFChAgRIkSIECFChAgRIkSICBEiRIgQIUKECBEiRIj8Ro4CDABFkl3AZSyWGwAAAABJRU5ErkJggg==';
//     util.base64toFile(image, 'test')
//   })
// })