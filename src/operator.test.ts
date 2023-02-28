import { describe, expect, it } from 'vitest'

import { isBoolean, isNumber, isObject, isString } from './base'
import { make } from './make'
import { and, arrayOf, or } from './operator'

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
    make({
      name: isString,
    }),
    make({
      age: isNumber,
    })
  )

  it('should return true if value matches all of the guards', () => {
    expect(guard({ name: 'LuciNyan', age: 17 })).toBe(true)
  })

  it('should return false if value does not match all of the guards', () => {
    expect(guard(undefined)).toBe(false)
    expect(guard(null)).toBe(false)
    expect(guard({ name: 123 })).toBe(false)
    expect(guard({ age: 30 })).toBe(false)
    expect(guard({ name: 123 })).toBe(false)
    expect(guard({ name: 'LuciNyan', age: '17' })).toBe(false)
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
