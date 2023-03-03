declare function isString(x: unknown): x is string
declare function isNumber(x: unknown): x is number
declare function isBoolean(x: unknown): x is boolean
declare function isUndefined(x: unknown): x is undefined
declare function isNull(x: unknown): x is null
declare function isFunction(x: unknown): x is Function
declare function isObject(x: unknown): x is Record<string, unknown>
declare function isRegExp(x: unknown): x is RegExp
declare function isDate(x: unknown): x is Date
declare function isSymbol(x: unknown): x is Symbol
declare function isBigInt(x: unknown): x is BigInt
declare function isWindow(x: unknown): x is Window
declare function isPromise(x: unknown): x is Promise<unknown>
declare function isIterator(obj: unknown): obj is Iterator<unknown>
declare function isMap(obj: unknown): obj is Map<unknown, unknown>
declare function isSet(obj: unknown): obj is Set<unknown>

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
type Guard<T> = ((x: unknown) => x is T) & {
  __isOptional?: boolean
  __isCircularRef?: boolean
}
type GuardFor<T> = T extends Guard<infer R> ? R : never
type GuardConfig = Record<PropertyKey, Guard<unknown>>
type MakeGuardFromConfig<T extends Record<PropertyKey, Guard<unknown>>> = (
  value: unknown
) => value is MakeTypeFromConfig<T>
type MakeTypeFromConfig<T extends Record<PropertyKey, Guard<unknown>>> = handleMetadataIsSelf<
  UnionToIntersection<handleMetadataIsOptional<T, keyof T>>
>
type handleMetadataIsOptional<T extends GuardConfig, K extends keyof T> = K extends K
  ? T[K] extends {
      __isOptional: true
    }
    ? {
        [Key in keyof T as Key extends K ? Key : never]?: T[K]
      }
    : {
        [Key in keyof T as Key extends K ? Key : never]: T[K]
      }
  : never
type handleMetadataIsSelf<T> = {
  [K in keyof T]: T[K] extends {
    __isCircularRef: true
  }
    ? handleMetadataIsSelf<T>
    : GuardFor<T[K]>
}
declare function toString(x: unknown): string

declare function objectOf<R extends Record<PropertyKey, Guard<unknown>>>(guardByProperty: R): MakeGuardFromConfig<R>
declare function arrayOf<T extends unknown[]>(
  ...guards: {
    [K in keyof T]: Guard<T[K]>
  }
): Guard<T>
declare function union<T extends any[]>(
  ...guards: {
    [K in keyof T]: Guard<T[K]>
  }
): (x: unknown) => x is T[number]
declare function intersection<T extends any[]>(
  ...guards: {
    [K in keyof T]: Guard<T[K]>
  }
): (x: unknown) => x is UnionToIntersection<T[number]>
declare function optional<T>(guard: Guard<T>): Guard<T> & {
  __isOptional: true
}
declare const or: typeof union
declare const and: typeof intersection
declare const make: typeof objectOf

declare const SELF: Guard<any>
declare function hasUnknownProperty<K extends string>(
  x: unknown,
  name: K
): x is {
  [Key in K]: unknown
}
declare function hasProperty<K extends string, V>(
  x: unknown,
  name: K,
  guard: Guard<V>
): x is {
  [Key in K]: V
}
declare function hasProperties<R extends GuardConfig>(x: unknown, guardByProperty: R): x is MakeTypeFromConfig<R>
declare function _hasProperty<K extends string, V, R extends GuardConfig>(
  x: unknown,
  name: K,
  guard: Guard<V>,
  memo?: Set<unknown>,
  guardByProperty?: R
): x is {
  [Key in K]: V
}
declare function _hasProperties<R extends GuardConfig>(
  x: unknown,
  guardByProperty: R,
  memo?: Set<unknown>
): x is MakeTypeFromConfig<R>

export {
  Guard,
  GuardConfig,
  GuardFor,
  MakeGuardFromConfig,
  MakeTypeFromConfig,
  SELF,
  UnionToIntersection,
  _hasProperties,
  _hasProperty,
  and,
  arrayOf,
  hasProperties,
  hasProperty,
  hasUnknownProperty,
  intersection,
  isBigInt,
  isBoolean,
  isDate,
  isFunction,
  isIterator,
  isMap,
  isNull,
  isNumber,
  isObject,
  isPromise,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isUndefined,
  isWindow,
  make,
  objectOf,
  optional,
  or,
  toString,
  union,
}
