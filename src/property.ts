import { isObject } from './base'
import { Guard, GuardConfig, MakeTypeFromConfig } from './utils'

export const SELF: Guard<any> = (x: unknown): x is any => true
SELF.isSelf = true

export function hasUnknownProperty<K extends string>(x: unknown, name: K): x is { [Key in K]: unknown } {
  return isObject(x) && name in x
}

export function hasProperty<K extends string, V>(x: unknown, name: K, guard: Guard<V>): x is { [Key in K]: V } {
  if (!hasUnknownProperty(x, name)) {
    return !!guard.isOptional
  }

  const memo = new Set([x])

  if (guard === SELF) {
    return _hasProperty(x[name], name, SELF, memo)
  }

  return guard(x[name])
}

export function hasProperties<R extends GuardConfig>(x: unknown, guardByProperty: R): x is MakeTypeFromConfig<R> {
  const memo = new Set([x])

  return Object.entries(guardByProperty).every(([key, guard]) => {
    return _hasProperty(x, key, guard, memo, guardByProperty)
  })
}

export function _hasProperty<K extends string, V, R extends GuardConfig>(
  x: unknown,
  name: K,
  guard: Guard<V>,
  memo = new Set(),
  guardByProperty?: R
): x is { [Key in K]: V } {
  if (!hasUnknownProperty(x, name)) {
    return !!guard.isOptional
  }

  memo.add(x)

  if (guard === SELF && guardByProperty) {
    return memo.has(x[name]) ? true : _hasProperties(x[name], guardByProperty, memo)
  }

  return guard(x[name])
}

export function _hasProperties<R extends GuardConfig>(
  x: unknown,
  guardByProperty: R,
  memo = new Set()
): x is MakeTypeFromConfig<R> {
  memo.add(x)

  return Object.entries(guardByProperty).every(([key, guard]) => {
    return _hasProperty(x, key, guard, memo, guardByProperty)
  })
}
