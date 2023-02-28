import { isObject } from './base'
import { Guard } from './utils'

export function hasUnknownProperty<K extends string>(x: unknown, name: K): x is { [Key in K]: unknown } {
  return isObject(x) && name in x
}

export const SELF = (x: unknown): x is any => true
let __GUARD_BY_PROPERTY__: any = {}

export function hasProperty<K extends string, V>(
  x: unknown,
  name: K,
  guard: (value: unknown) => value is V
): x is { [Key in K]: V } {
  if (!hasUnknownProperty(x, name)) {
    return false
  }

  const memo = new Set([x])

  if (guard === SELF) {
    return _hasProperties(x[name], __GUARD_BY_PROPERTY__, memo)
  }

  return guard(x[name])
}

export function hasProperties<R extends Record<PropertyKey, unknown>>(
  x: unknown,
  guardByProperty: {
    [K in keyof R]: Guard<R[K]>
  }
): x is R {
  __GUARD_BY_PROPERTY__ = guardByProperty

  const memo = new Set([x])

  return Object.entries(guardByProperty).every(([key, guard]) => {
    return _hasProperty(x, key, guard, memo)
  })
}

export function _hasProperty<K extends string, V>(
  x: unknown,
  name: K,
  guard: Guard<V>,
  memo = new Set()
): x is { [Key in K]: V } {
  if (!hasUnknownProperty(x, name)) {
    return false
  }

  memo.add(x)

  if (guard === SELF) {
    return memo.has(x[name]) ? true : _hasProperties(x[name], __GUARD_BY_PROPERTY__, memo)
  }

  return guard(x[name])
}

export function _hasProperties<R extends Record<PropertyKey, unknown>>(
  x: unknown,
  guardByProperty: {
    [K in keyof R]: Guard<R[K]>
  },
  memo = new Set()
): x is R {
  memo.add(x)

  return Object.entries(guardByProperty).every(([key, guard]) => {
    return _hasProperty(x, key, guard, memo)
  })
}
