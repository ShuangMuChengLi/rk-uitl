import util from '../src/index';
describe('util.isEmpty', () => {
  test('empty string', () => {
    let result = util.isEmpty( '');
    expect(result).toBe(true);
  });
  test('number', () => {
    let result = util.isEmpty(0);
    expect(result).toBe(false);
  });
  test('boolean', () => {
    let result = util.isEmpty(false);
    expect(result).toBe(false);
  });
});

describe('util.objectRemoveValueIsNull', () => {
  test('empty string', () => {
    let result = util.objectRemoveValueIsNull({ name: ''});
    expect(result.name).toBe(undefined);
  });
  test('0', () => {
    let result = util.objectRemoveValueIsNull({ name: 0});
    expect(result.name).toBe(0);
  });
  test('boolean', () => {
    let result = util.objectRemoveValueIsNull({ name: false});
    expect(result.name).toBe(false);
  });
});

describe('util.isEmptyObject', () => {
  test('string', () => {
    let result = util.isEmptyObject('hello world');
    expect(result).toBe(false);
  });
  test('string', () => {
    let result = util.isEmptyObject('');
    expect(result).toBe(false);
  });
  test('{count:1}', () => {
    let result = util.isEmptyObject({count: 1});
    expect(result).toBe(false);
  });
  test('[]', () => {
    let result = util.isEmptyObject([]);
    expect(result).toBe(false);
  });
  test('new fn()', () => {
    function fn(){}
    let result = util.isEmptyObject(new fn());
    expect(result).toBe(true);
  });
  test('{}', () => {
    let result = util.isEmptyObject({});
    expect(result).toBe(true);
  });
});

describe('util.getAge', () => {
  test('1999-10-08', () => {
    let result = util.getAge('1999-10-08');
    expect(result).toBe(20);
  });
  test('1999-10-08 12:10:10', () => {
    let result = util.getAge('1999-10-08');
    expect(result).toBe(20);
  });
  test('new Date()', () => {
    let result = util.getAge(new Date());
    expect(result).toBe(0);
  });
});
describe('util.keydownEnter', () => {
  test('enter', (done) => {
    let event = new KeyboardEvent('keydown',{code:'Enter'});
    util.keydownEnter(event, ()=>{
      done();
    });
  });
  test('not enter', (done) => {
    let event = new KeyboardEvent('keydown',{code: 'KeyE'});
    util.keydownEnter(event, null, ()=>{
      done();
    });
  });
});
