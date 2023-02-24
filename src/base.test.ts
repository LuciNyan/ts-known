import { describe, expect, it } from 'vitest'
import {
    isString,
    isNumber,
    isBoolean,
    isUndefined,
    isNull,
    isFunction,
    isObject,
    isRegExp,
    isDate,
    isSymbol,
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
        expect(isFunction(function() {})).toBe(true)
    })

    it('should return false if value is not a function', () => {
        expect(isFunction(undefined)).toBe(false)
        expect(isFunction({})).toBe(false)
        expect(isFunction([])).toBe(false)
        expect(isFunction(123)).toBe(false)
        expect(isFunction(null)).toBe(false)
    })
})