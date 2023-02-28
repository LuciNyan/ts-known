import { hasProperties } from './property'
import { Guard, UnionToIntersection } from './utils'

export function objectOf<R extends Record<PropertyKey, unknown>>(guardByProperty: {
  [K in keyof R]: Guard<R[K]>
}): (value: unknown) => value is R {
  return (x: unknown): x is R => {
    return hasProperties(x, guardByProperty)
  }
}

export function arrayOf<T extends unknown[]>(guards: { [K in keyof T]: Guard<T[K]> }): Guard<T>
export function arrayOf<T extends unknown[]>(...guards: { [K in keyof T]: Guard<T[K]> }): Guard<T>
export function arrayOf<T extends unknown[]>(
  ...guards: { [K in keyof T]: Guard<T[K]> } | [{ [K in keyof T]: Guard<T[K]> }]
): Guard<T> {
  const _guards = guards[0]
  if (Array.isArray(_guards)) {
    return (x: unknown): x is T => {
      if (!Array.isArray(x) || x.length !== _guards.length) {
        return false
      }
      return x.every((value, index) => _guards[index](value))
    }
  }

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

export const or = union
export const and = intersection
