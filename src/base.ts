import { toString } from './utils'

export function isString(x: unknown): x is string {
  return toString(x) === '[object String]'
}

export function isNumber(x: unknown): x is number {
  return toString(x) === '[object Number]'
}

export function isBoolean(x: unknown): x is boolean {
  return toString(x) === '[object Boolean]'
}

export function isUndefined(x: unknown): x is undefined {
  return toString(x) === '[object Undefined]'
}

export function isNull(x: unknown): x is null {
  return toString(x) === '[object Null]'
}

export function isFunction(x: unknown): x is Function {
  return toString(x) === '[object Function]'
}

export function isObject(x: unknown): x is object {
  return toString(x) === '[object Object]'
}

export function isRegExp(x: unknown): x is RegExp {
  return toString(x) === '[object RegExp]'
}

export function isDate(x: unknown): x is Date {
  return toString(x) === '[object Date]'
}

export function isSymbol(x: unknown): x is Symbol {
  return toString(x) === '[object Symbol]'
}

export function isWindow(x: unknown): x is Window {
  return toString(x) === '[object Window]'
}

export function isIterator(obj: unknown): obj is Iterator<unknown> {
  return isObject(obj) && obj !== null && typeof (obj as any)[Symbol.iterator] === 'function'
}
