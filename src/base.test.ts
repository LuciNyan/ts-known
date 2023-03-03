import { describe, expect, it } from 'vitest'

import {
  isBigInt,
  isBoolean,
  isDate,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isSymbol,
  isUndefined,
  isWindow,
} from './base'

describe('isString', () => {
  it('should return true if value is a string', () => {
    expect(isString('foo')).toBe(true)
    expect(isString('')).toBe(true)
    expect(isString(String('foo'))).toBe(true)
  })

  it('should return false if value is not a string', () => {
    expect(isString(123)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString(true)).toBe(false)
  })
})

describe('isNumber', () => {
  it('should return true if value is a number', () => {
    expect(isNumber(123)).toBe(true)
    expect(isNumber(Number('123'))).toBe(true)
  })

  it('should return false if value is not a number', () => {
    expect(isNumber('123')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber(true)).toBe(false)
  })
})

describe('isBoolean', () => {
  it('should return true if value is a boolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(Boolean('true'))).toBe(true)
  })

  it('should return false if value is not a boolean', () => {
    expect(isBoolean('true')).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean({})).toBe(false)
    expect(isBoolean([])).toBe(false)
    expect(isBoolean(123)).toBe(false)
  })
})

describe('isUndefined', () => {
  it('should return true if value is undefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(void 0)).toBe(true)
  })

  it('should return false if value is not undefined', () => {
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined('undefined')).toBe(false)
    expect(isUndefined({})).toBe(false)
    expect(isUndefined([])).toBe(false)
    expect(isUndefined(123)).toBe(false)
  })
})

describe('isNull', () => {
  it('should return true if value is null', () => {
    expect(isNull(null)).toBe(true)
  })

  it('should return false if value is not null', () => {
    expect(isNull(undefined)).toBe(false)
    expect(isNull('null')).toBe(false)
    expect(isNull({})).toBe(false)
    expect(isNull([])).toBe(false)
    expect(isNull(123)).toBe(false)
  })
})

describe('isFunction', () => {
  it('should return true if value is a function', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
  })

  it('should return false if value is not a function', () => {
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction(123)).toBe(false)
    expect(isFunction(null)).toBe(false)
  })

  it('should return true if value is a class', () => {
    class Test {}
    expect(isFunction(Test)).toBe(true)
  })

  it('should return true for async function', () => {
    expect(isFunction(async () => {})).toBe(false)
  })

  it('should return false for generator function', () => {
    expect(isFunction(function* () {})).toBe(false)
  })

  it('should return true for arrow function', () => {
    expect(isFunction(() => {})).toBe(true)
  })

  it('should return true for built-in functions', () => {
    expect(isFunction(Array.isArray)).toBe(true)
  })
})

describe('isObject', () => {
  it('should return true if value is an object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(Object.create(null))).toBe(true)
    expect(isObject(new Object())).toBe(true)
  })

  it('should return false if value is not an object', () => {
    expect(isObject(undefined)).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject(123)).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(function () {})).toBe(false)
    expect(isObject(new Date())).toBe(false)
    expect(isObject(/abc/)).toBe(false)
    expect(isObject(new RegExp('abc'))).toBe(false)
  })
})

describe('isRegExp', () => {
  it('should return true if value is a RegExp', () => {
    expect(isRegExp(/abc/)).toBe(true)
    expect(isRegExp(new RegExp('abc'))).toBe(true)
  })

  it('should return false if value is not a RegExp', () => {
    expect(isRegExp(undefined)).toBe(false)
    expect(isRegExp(null)).toBe(false)
    expect(isRegExp(123)).toBe(false)
    expect(isRegExp('string')).toBe(false)
    expect(isRegExp(true)).toBe(false)
    expect(isRegExp({})).toBe(false)
  })
})

describe('isDate', () => {
  it('should return true if value is a Date', () => {
    expect(isDate(new Date())).toBe(true)
  })

  it('should return false if value is not a Date', () => {
    expect(isDate(undefined)).toBe(false)
    expect(isDate(null)).toBe(false)
    expect(isDate(123)).toBe(false)
    expect(isDate('string')).toBe(false)
    expect(isDate(true)).toBe(false)
    expect(isDate({})).toBe(false)
  })
})

describe('isSymbol', () => {
  it('should return true if value is a Symbol', () => {
    expect(isSymbol(Symbol())).toBe(true)
    expect(isSymbol(Symbol('foo'))).toBe(true)
  })

  it('should return false if value is not a Symbol', () => {
    expect(isSymbol(undefined)).toBe(false)
    expect(isSymbol(null)).toBe(false)
    expect(isSymbol(123)).toBe(false)
    expect(isSymbol('string')).toBe(false)
    expect(isSymbol(true)).toBe(false)
    expect(isSymbol({})).toBe(false)
  })
})

describe('isBigInt', () => {
  it('should return true if value is a BigInt', () => {
    expect(isBigInt(BigInt('0x1fffffffffffff'))).toBe(true)
  })

  it('should return false if value is not a BigInt', () => {
    expect(isBigInt(undefined)).toBe(false)
    expect(isBigInt(null)).toBe(false)
    expect(isBigInt(123)).toBe(false)
    expect(isBigInt('string')).toBe(false)
    expect(isBigInt(true)).toBe(false)
    expect(isBigInt({})).toBe(false)
  })
})

describe('isWindow', () => {
  it('should return false if value is not the window object', () => {
    expect(isWindow(undefined)).toBe(false)
    expect(isWindow(null)).toBe(false)
    expect(isWindow(123)).toBe(false)
    expect(isWindow('string')).toBe(false)
    expect(isWindow(true)).toBe(false)
    expect(isWindow({})).toBe(false)
  })
})
