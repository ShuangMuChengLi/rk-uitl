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
    const result = util.getAge('1999-10-08')
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
})
