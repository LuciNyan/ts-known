# ts-known
If you're looking for a ultra-light and non-intrusive utility library to conveniently and safely handle unknown variables in your TypeScript projects, **ts-known** can help. With a collection of guards for common types and functions to generate type-specific guards, **ts-known** allows for easy handling of **unknown** variables caught by try-catch, network-transmitted data, and parsed JSON objects.

## Installation
To install **ts-known**, simply use your favorite package manager:

```bash
npm install ts-known
# or
yarn add ts-known
```

## Features
- Provides a collection of guards for common types
- Allows you to generate type-specific guards with ease
- Ensures your code is safe when handling unknown type variables
- Supports handling of circular references
- Easy to use and integrate into your TypeScript project

## Usage
Using **ts-known** is easy. Simply import the library and start using its guards:
```ts
import { isIterator } from 'ts-known'

const x: unknown

if (isIterator(x)) {
  // x is now guaranteed to be a iterator
}
```


In addition to the provided guards, you can also generate your own type-specific guards.

### objectOf
objectOf is a function that takes an object with property names and associated guards as arguments and returns a function that checks if an object has properties guarded by given guards. If the object has a circular reference, SELF should be used as the guard.
```ts
import { objectOf, isString, isNumber, SELF } from 'ts-known'

type Elem = {
  name: string
  ref: Elem
}

function handleElem(x: Elem) {}

const guard = objectOf({
  name: isString,
  ref: optional(SELF),
})

const elem: unknown = { name: 'element' }
console.log(guard(elem)) // true

elem.ref = 1
console.log(guard(elem)) // false

elem.ref = elem
console.log(guard(elem)) // true

handleElem(elem) // TS: Argument of type 'unknown' is not assignable to parameter of type 'Elem'.

if (guard(elem)) {
  handleElem(elem) // 🎉
}
```

### arrayOf
arrayOf is a function that takes a spread of guards as arguments and returns a function that checks if an array contains only elements that match one of the given guards.
```ts
import { arrayOf, isString, isNumber } from 'ts-known'

const guard = arrayOf(isNumber, isString)

console.log(guard([1])) // true
console.log(guard([1, 'hello'])) // true
console.log(guard(['1', 'hello', '1', 'hello'])) // true
console.log(guard([true])) // false
console.log(guard([1, 'hello', true])) // false

```

### or
or is a function that takes a spread of guards as arguments and returns a function that checks if a value matches any of the given guards.
```ts
import { or, isString, isNumber, isBoolean } from 'ts-known'

const guard = or(isString, isNumber, isBoolean)

console.log(guard('foo')) // true
console.log(guard(123)) // true
console.log(guard(true)) // true
console.log(guard(undefined)) // false
console.log(guard(null)) // false
console.log(guard({})) // false
console.log(guard([])) // false
```

### and
and is a function that takes a spread of guards as arguments and returns a function that checks if a value matches all of the given guards.
```ts
import { and, objectOf, isObject, isString, isNumber } from 'ts-known'

const guard = and(
  isObject,
  objectOf({ name: isString }),
  objectOf({ age: isNumber })
)

console.log(guard({ name: 'Luci', age: 17 })) // true
console.log(guard(undefined)) // false
console.log(guard(null)) // false
console.log(guard({ name: 'Luci' })) // false
console.log(guard({ age: 30 })) // false
console.log(guard({ name: 123 })) // false
console.log(guard({ name: 'Luci', age: '17' })) // false
```

### optional
optional is a function that takes a guard as an argument and returns a function that checks if a value is either undefined or matches the given guard.
```ts
const guard = and(
  isObject,
  objectOf({
    name: optional(isString),
  }),
  objectOf({
    age: optional(isNumber),
  })
)

console.log(guard({ name: 'Luci', age: 17 })) // true
console.log(guard({ name: 'Luci' })) // true
console.log(guard({ age: 17 })) // true
console.log(guard({})) // true
console.log(guard(undefined)) // false
console.log(guard(null)) // false
console.log(guard({ name: 'Luci', age: '17' })) // false
console.log(guard({ name: 17 })) // false
```
  

## Contribution
We welcome any contributions to ts-known! Feel free to create a pull request, report a bug, or suggest new features. We appreciate your support!

## License
**ts-known** is licensed under the MIT license.
