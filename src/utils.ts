export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type Guard<T> = ((x: unknown) => x is T) & {
  optional?: boolean
}

export function toString(x: unknown): string {
  return Object.prototype.toString.call(x)
}
