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

describe('util.beyondShowDot', () => {
  test('string length > 2', () => {
    expect(util.beyondShowDot('beyondShowDot', 2)).toBe('be...');
  });

  test('string none', () => {
    expect(util.beyondShowDot('', 2)).not.toBe('be...');
  });
  test('string none', () => {
    expect(util.beyondShowDot('', 2)).toBe('');
  });
  test('string length > 14', () => {
    expect(util.beyondShowDot('beyondShowDot', 14)).toBe('beyondShowDot');
  });
  test('string length > 14', () => {
    expect(util.beyondShowDot('beyondShowDot', 14)).not.toBe('beyon...');
  });
});

describe('util.addZero', () => {
  test('input number 24 leng 4', () => {
    expect(util.addZero(24, 4)).toBe('0024');
  });
  test('input number 24 leng 3', () => {
    expect(util.addZero(24, 3)).not.toBe('0024');
  });
});

describe('util.getMonthArray', () => {
  test('input monthList [201811, 202012]', () => {
    expect(util.getMonthArray(['201811', '201902'])).toStrictEqual(['2018-11', '2018-12', '2019-01', '2019-02']);
  });
  test('input monthList [201811, 201810, 201902, 201901]', () => {
    expect(util.getMonthArray(['201811', '201810', '201902', '201901'])).toStrictEqual(['2018-10','2018-11', '2018-12', '2019-01', '2019-02']);
  });
});