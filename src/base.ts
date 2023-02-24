export function toString(x: unknown): string {
  return Object.prototype.toString.call(x)
}

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

export function hasUnknownProperty<K extends string>(x: unknown, name: K): x is { [Key in K]: unknown } {
  return isObject(x) && name in x
}

const __SELF__ = (x: unknown): x is any => true
let __GUARD_BY_PROPERTY__: any = {} 

function hasProperty<K extends string, V>(
  x: unknown,
  name: K,
  guard: (value: unknown) => value is V,
): x is { [Key in K]: V } {
    if (!hasUnknownProperty(x, name)) {
        return false
    }

    const memo = new Set([x])

    if (guard === __SELF__) {
        return _hasProperties(x[name], __GUARD_BY_PROPERTY__, memo)
    }

    return guard(x[name])
}

function hasProperties<R extends Record<PropertyKey, unknown>>(
  x: unknown,
  guardByProperty: {
    [K in keyof R]: ((value: unknown) => value is R[K])
  },
): x is R {
  __GUARD_BY_PROPERTY__ = guardByProperty

  const keys = Object.keys(guardByProperty)
  const memo = new Set([x])

  return keys.every((key) => {
      return _hasProperty(x, key, guardByProperty[key], memo)
  })
}

function _hasProperty<K extends string, V>(
  x: unknown,
  name: K,
  guard: (value: unknown) => value is V,
  memo = new Set()
): x is { [Key in K]: V } {
    if (!hasUnknownProperty(x, name))
        return false
    
    memo.add(x)

    if (guard === __SELF__) {
        return memo.has(x[name]) 
          ? true 
          : _hasProperties(x[name], __GUARD_BY_PROPERTY__, memo)
    }

    return guard(x[name])
}

function _hasProperties<R extends Record<PropertyKey, unknown>>(
  x: unknown,
  guardByProperty: {
    [K in keyof R]: ((value: unknown) => value is R[K])
  },
  memo = new Set()
): x is R {
    memo.add(x)

    const keys = Object.keys(guardByProperty)

    return keys.every((key) => {
        return _hasProperty(x, key, guardByProperty[key], memo)
    })
}

function make<R extends Record<PropertyKey, unknown>>(guardByProperty: {
    [K in keyof R]: ((value: unknown) => value is R[K])
  }): (value: unknown) => value is R {
    return (x: unknown): x is R => {
        return hasProperties(x, guardByProperty)
    }
}

function or<T extends any[]>(...guards: { [K in keyof T]: (x: unknown) => x is T[K] }): (x: unknown) => x is T[number] {
  return (x: unknown): x is T[number] => {
    return guards.some((guard) => guard(x))
  }
}
