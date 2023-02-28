import { isObject } from './base'
import { Guard } from './utils'

export function hasUnknownProperty<K extends string>(x: unknown, name: K): x is { [Key in K]: unknown } {
  return isObject(x) && name in x
}

export const SELF = (x: unknown): x is any => true

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
    return _hasProperty(x[name], name, SELF, memo)
  }

  return guard(x[name])
}

export function hasProperties<R extends Record<PropertyKey, unknown>>(
  x: unknown,
  guardByProperty: {
    [K in keyof R]: Guard<R[K]>
  }
): x is R {
  const memo = new Set([x])

  return Object.entries(guardByProperty).every(([key, guard]) => {
    return _hasProperty(x, key, guard, memo, guardByProperty)
  })
}

export function _hasProperty<K extends string, V, R extends Record<PropertyKey, unknown>>(
  x: unknown,
  name: K,
  guard: Guard<V>,
  memo = new Set(),
  guardByProperty: {
    [Key in keyof R]?: Guard<R[Key]>
  } = {}
): x is { [Key in K]: V } {
  if (!hasUnknownProperty(x, name)) {
    return false
  }

  memo.add(x)

  if (guard === SELF) {
    return memo.has(x[name]) ? true : _hasProperties(x[name], guardByProperty, memo)
  }

  return guard(x[name])
}

export function _hasProperties<R extends Record<PropertyKey, unknown>>(
  x: unknown,
  guardByProperty: {
    [Key in keyof R]?: Guard<R[Key]>
  },
  memo = new Set()
): x is R {
  memo.add(x)

  return Object.entries(guardByProperty).every(([key, guard]) => {
    return _hasProperty(x, key, guard, memo, guardByProperty)
  })
}
