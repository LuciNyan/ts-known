import { hasProperties } from './property'

export function make<R extends Record<PropertyKey, unknown>>(guardByProperty: {
  [K in keyof R]: (value: unknown) => value is R[K]
}): (value: unknown) => value is R {
  return (x: unknown): x is R => {
    return hasProperties(x, guardByProperty)
  }
}
