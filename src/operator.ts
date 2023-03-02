import { hasProperties } from './property'
import { Guard, MakeGuardFromConfig, MakeTypeFromConfig, UnionToIntersection } from './utils'

export function objectOf<R extends Record<PropertyKey, Guard<unknown>>>(guardByProperty: R): MakeGuardFromConfig<R> {
  return (x: unknown): x is MakeTypeFromConfig<R> => {
    return hasProperties(x, guardByProperty)
  }
}

export function arrayOf<T extends unknown[]>(...guards: { [K in keyof T]: Guard<T[K]> }): Guard<T> {
  return function (x: unknown): x is T {
    if (!Array.isArray(x)) {
      return false
    }

    return x.every((item) =>
      guards.some((guard) => {
        return (guard as any)(item)
      })
    )
  }
}

export function union<T extends any[]>(...guards: { [K in keyof T]: Guard<T[K]> }): (x: unknown) => x is T[number] {
  return (x: unknown): x is T[number] => {
    return guards.some((guard) => guard(x))
  }
}

export function intersection<T extends any[]>(
  ...guards: { [K in keyof T]: Guard<T[K]> }
): (x: unknown) => x is UnionToIntersection<T[number]> {
  return (x: unknown): x is UnionToIntersection<T[number]> => {
    return guards.every((guard) => guard(x))
  }
}

export function optional<T>(guard: Guard<T>): Guard<T> & {
  __isOptional: true
} {
  const _guard = (...args: Parameters<Guard<T>>) => guard(...args)

  _guard.__isOptional = true

  if (guard.__isCircularRef) {
    _guard.__isCircularRef = guard.__isCircularRef
  }

  return _guard as Guard<T> & {
    __isOptional: true
  }
}

export const or = union
export const and = intersection
export const make = objectOf
