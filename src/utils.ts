export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type Guard<T> = ((x: unknown) => x is T) & {
  isOptional?: boolean
  isSelf?: boolean
}

export type GuardFor<T> = T extends Guard<infer R> ? R : never

export type GuardConfig = Record<PropertyKey, Guard<unknown>>
export type MakeGuardFromConfig<T extends Record<PropertyKey, Guard<unknown>>> = (
  value: unknown
) => value is MakeTypeFromConfig<T>

export type MakeTypeFromConfig<T extends Record<PropertyKey, Guard<unknown>>> = handleMetadataIsSelf<
  UnionToIntersection<handleMetadataIsOptional<T, keyof T>>
>

type handleMetadataIsOptional<T extends GuardConfig, K extends keyof T> = K extends K
  ? T[K] extends { isOptional: true }
    ? {
        [Key in keyof T as Key extends K ? Key : never]?: T[K]
      }
    : {
        [Key in keyof T as Key extends K ? Key : never]: T[K]
      }
  : never

type handleMetadataIsSelf<T> = {
  [K in keyof T]: T[K] extends { isSelf: true } ? handleMetadataIsSelf<T> : GuardFor<T[K]>
}

export function toString(x: unknown): string {
  return Object.prototype.toString.call(x)
}
