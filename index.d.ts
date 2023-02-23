declare function toString(x: unknown): string;
declare function isString(x: unknown): x is String;
declare function isNumber(x: unknown): x is Number;
declare function isBoolean(x: unknown): x is boolean;
declare function isUndefined(x: unknown): x is undefined;
declare function isNull(x: unknown): x is null;
declare function isFunction(x: unknown): x is Function;
declare function isObject(x: unknown): x is object;
declare function isRegExp(x: unknown): x is RegExp;
declare function isDate(x: unknown): x is Date;
declare function isSymbol(x: unknown): x is Symbol;
declare function isWindow(x: unknown): x is Window;
declare function hasUnknownProperty<K extends string>(x: unknown, name: K): x is {
    [Key in K]: unknown;
};
declare function hasProperty<K extends string, V>(x: unknown, name: K, guard: (value: unknown) => value is V): x is {
    [Key in K]: V;
};
declare function hasProperties<R extends Record<PropertyKey, unknown>>(x: unknown, checkers: {
    [K in keyof R]: ((value: unknown) => value is R[K]);
}): x is R;
declare function make<V>(callback: ((x: unknown, self: (x: unknown) => x is V) => boolean)): (x: unknown) => x is V;

export { hasProperties, hasProperty, hasUnknownProperty, isBoolean, isDate, isFunction, isNull, isNumber, isObject, isRegExp, isString, isSymbol, isUndefined, isWindow, make, toString };
