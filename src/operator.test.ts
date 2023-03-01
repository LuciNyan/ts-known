import { describe, expect, it } from 'vitest'

import { isBoolean, isNumber, isObject, isString } from './base'
import { and, arrayOf, objectOf, optional, or } from './operator'
import { SELF } from './property'

type Elem = {
  name: string
  ref: Elem
}

describe('objectOf', () => {
  it('should return a function that checks if an object has properties guarded by given guards', () => {
    const guard = objectOf({
      foo: isString,
      bar: isNumber,
      baz: isBoolean,
    })

    expect(guard({ foo: 'hello', bar: 123, baz: false })).toBe(true)
    expect(guard({ foo: 'world', bar: '123', baz: false })).toBe(false)
    expect(guard({ foo: 'hello', bar: 123 })).toBe(false)
  })

  it('should return a function that checks if an object with circular reference is of correct type', () => {
    const guard = objectOf<Elem>({
      name: isString,
      ref: SELF,
    })

    const elem: any = { name: 'element' }

    elem.abc = elem
    expect(guard(elem)).toBe(false)

    elem.ref = elem
    expect(guard(elem)).toBe(true)
  })
})

describe('arrayOf', () => {
  describe('when passed an array of guards', () => {
    const guard = arrayOf(isNumber, isString)

    it('returns true when passed an array of matching types', () => {
      expect(guard([1])).toBe(true)
      expect(guard([1, 'hello'])).toBe(true)
      expect(guard(['1', 'hello', '1', 'hello'])).toBe(true)
    })

    it('returns false when passed an array of non-matching types', () => {
      expect(guard([true])).toBe(false)
      expect(guard([1, 'hello', true])).toBe(false)
    })
  })

  describe('when passed a spread of guards', () => {
    const guard = arrayOf(isNumber, isString)

    it('returns true when passed an array of matching types', () => {
      expect(guard([1])).toBe(true)
      expect(guard([1, 'hello'])).toBe(true)
      expect(guard(['1', 'hello', '1', 'hello'])).toBe(true)
    })

    it('returns false when passed an array of non-matching types', () => {
      expect(guard([true])).toBe(false)
      expect(guard([1, 'hello', true])).toBe(false)
    })
  })

  describe('when passed a combination of guards', () => {
    const guard = arrayOf([isBoolean, isNumber])

    it('returns true when passed an array of matching types', () => {
      expect(guard([false, 1])).toBe(true)
    })

    it('returns false when passed an array of non-matching types', () => {
      expect(guard([1, false])).toBe(false)
      expect(guard([false])).toBe(false)
      expect(guard([false, 'hello'])).toBe(false)
    })
  })
})

describe('or', () => {
  it('should return true if value matches any of the guards', () => {
    const guard = or(isString, isNumber, isBoolean)
    expect(guard('foo')).toBe(true)
    expect(guard(123)).toBe(true)
    expect(guard(true)).toBe(true)
  })

  it('should return false if value does not match any of the guards', () => {
    const guard = or(isString, isNumber, isBoolean)
    expect(guard(undefined)).toBe(false)
    expect(guard(null)).toBe(false)
    expect(guard({})).toBe(false)
    expect(guard([])).toBe(false)
  })
})

describe('and', () => {
  const guard = and(
    isObject,
    objectOf({
      name: isString,
    }),
    objectOf({
      age: isNumber,
    })
  )

  it('should return true if value matches all of the guards', () => {
    expect(guard({ name: 'LuciNyan', age: 17 })).toBe(true)
  })

  it('should return false if value does not match all of the guards', () => {
    expect(guard(undefined)).toBe(false)
    expect(guard(null)).toBe(false)
    expect(guard({ name: 'Luci' })).toBe(false)
    expect(guard({ age: 30 })).toBe(false)
    expect(guard({ name: 123 })).toBe(false)
    expect(guard({ name: 'LuciNyan', age: '17' })).toBe(false)
  })
})

describe('optional', () => {
  const guard = and(
    isObject,
    objectOf({
      name: optional(isString),
    }),
    objectOf({
      age: optional(isNumber),
    })
  )

  it('should return true if value matches all of the guards', () => {
    expect(guard({ name: 'LuciNyan', age: 17 })).toBe(true)
    expect(guard({ name: 'LuciNyan' })).toBe(true)
    expect(guard({ age: 17 })).toBe(true)
    expect(guard({})).toBe(true)
  })

  it('should return false if value does not match all of the guards', () => {
    expect(guard(undefined)).toBe(false)
    expect(guard(null)).toBe(false)
    expect(guard({ name: 'LuciNyan', age: '17' })).toBe(false)
    expect(guard({ name: 17 })).toBe(false)
  })
})
