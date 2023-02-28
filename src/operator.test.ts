import { describe, expect, it } from 'vitest'

import { isBoolean, isNumber, isObject, isString } from './base'
import { make } from './make'
import { and, or, arrayOf } from './operator'

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
  const guard = arrayOf(
    isString,
    isNumber
  )
  const guard1 = arrayOf(or(
    isString,
    isNumber
  ))


  it('should return true if value matche', () => {
    expect(guard([1])).toBe(true)
    expect(guard([1, 2])).toBe(true)
    expect(guard(['Luci'])).toBe(true)
    expect(guard1([1])).toBe(true)
    expect(guard1([1, 2])).toBe(true)
    expect(guard1(['Luci'])).toBe(true)
  })

  it('should return false if value does not match', () => {
    expect(guard(undefined)).toBe(false)
    expect(guard(null)).toBe(false)
    expect(guard({ name: 123 })).toBe(false)
    expect(guard1(undefined)).toBe(false)
    expect(guard1(null)).toBe(false)
    expect(guard1({ name: 123 })).toBe(false)
  })
})
