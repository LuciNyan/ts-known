export type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export function toString(x: unknown): string {
  return Object.prototype.toString.call(x)
}