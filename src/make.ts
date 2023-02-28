import { hasProperties } from './property'
import { Guard } from './utils'

export function make<R extends Record<PropertyKey, unknown>>(guardByProperty: {
  [K in keyof R]: Guard<R[K]>
}): (value: unknown) => value is R {
  return (x: unknown): x is R => {
    return hasProperties(x, guardByProperty)
  }
}
