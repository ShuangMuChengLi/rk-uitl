实现字符串的md5、sha256等算法的加密工具——rk-encrypt

# Install
````
yarn add rk-encrypt
````
# Usage&Test
````
import encrypt from 'rk-encrypt';
describe('util.encrypt', () => {
  test('md5', () => {
    expect(encrypt('123456')).toBe('e10adc3949ba59abbe56e057f20f883e');
  });
  test('sha256', () => {
      expect(encrypt('123456', 'sha256')).toBe('8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
  });
});
````