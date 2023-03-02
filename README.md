# ts-known
If you're looking for a ultra-light and non-intrusive utility library to conveniently and safely handle unknown variables in your TypeScript projects, **ts-known** can help. With a collection of guards for common types and functions to generate type-specific guards, **ts-known** allows for easy handling of **unknown** variables caught by try-catch, network-transmitted data, and parsed JSON objects.

## Installation
To install **ts-known**, simply use your favorite package manager:

```bash
npm install ts-known
# or
yarn add ts-known
```

## Usage
Using **ts-known** is easy. Simply import the library and start using its guards:
```ts
import { isNumber } from 'ts-known'

const x: unknown = 42

if (isNumber(x)) {
  // x is now guaranteed to be a number
}
```

In addition to the provided guards, you can also generate your own type-specific guards:
```ts
import { arrayOf, isNumber, isString } from 'ts-known'

const guard = arrayOf(isNumber, isString)

const x: unknown = [42, 'hello']

if (guard(x)) {
  // x is now guaranteed to be a Array<number, string>
}
```

## Features
- Provides a collection of guards for common types
- Allows you to generate type-specific guards with ease
- Ensures your code is safe when handling unknown type variables
- Supports handling of circular references
- Easy to use and integrate into your TypeScript project
  

## Contribution
We welcome any contributions to ts-known! Feel free to create a pull request, report a bug, or suggest new features. We appreciate your support!

## License
**ts-known** is licensed under the MIT license.
