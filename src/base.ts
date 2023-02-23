export function toString(x: unknown): string {
  return Object.prototype.toString.call(x)
}

export function isString(x: unknown): x is String {
  return toString(x) === '[object String]'
}

export function isNumber(x: unknown): x is Number {
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

export function hasUnknownProperty<K extends string>(x: unknown, name: K): x is { [Key in K]: unknown } {
  return isObject(x) && name in x
}

const __SELF__ = (x: unknown): x is any => true

export function hasProperty<K extends string, V>(
  x: unknown,
  name: K,
  guard: (value: unknown) => value is V,
): x is { [Key in K]: V } {
  if (!hasUnknownProperty(x, name))
    return false

  return guard === __SELF__
    ? x === x[name]
    : guard(x[name])
}

export function hasProperties<R extends Record<PropertyKey, unknown>>(
  x: unknown,
  checkers: {
    [K in keyof R]: ((value: unknown) => value is R[K])
  },
): x is R {
  const keys = Object.keys(checkers)

  return keys.every((key) => {
    return hasProperty(x, key, checkers[key])
  })
}

export function make<V>(
  callback: ((x: unknown, self: (x: unknown) => x is V) => boolean)): (x: unknown) => x is V {
  return (x: unknown): x is V => {
    return callback(x, __SELF__)
  }
}
