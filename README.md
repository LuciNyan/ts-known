# ts-known
Are you tired of dealing with the unpredictable nature of unknown variables in your TypeScript projects? Does it feel like a hassle to manage errors caught by try-catch, network-transmitted data, and parsed JSON objects? Look no further than ts-known!

**ts-known** is a library that provides a collection of guards for common types, as well as functions to quickly generate type-specific guards. With ts-known, you can easily handle unknown type variables and ensure your code is always safe.

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
