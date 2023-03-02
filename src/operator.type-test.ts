import { isNumber, isString } from './base'
import { arrayOf, objectOf, optional, or } from './operator'
import { SELF } from './property'
import { doNotExecute, test, x } from './test-utils'

doNotExecute(() => {
  type Elem = {
    name: string
    ref: Elem
    age?: number
  }

  const guard = objectOf({
    name: isString,
    ref: SELF,
    age: optional(isNumber),
  })

  // @ts-expect-error
  test<Elem>(x)

  if (guard(x)) {
    test<Elem>(x)
    test<Elem>(x.ref)
    // @ts-expect-error
    test<Elem>(x.name)
    // @ts-expect-error
    test<Required<Elem>>(x)
  }
})

doNotExecute(() => {
  type ExpectType = Array<string | number>

  const guard = arrayOf(isNumber, isString)

  // @ts-expect-error
  test<ExpectData>(x)

  if (guard(x)) {
    test<ExpectType>(x)
    // @ts-expect-error
    test<Array<string>>(x)
    // @ts-expect-error
    test<Array<number>>(x)
  }
})

doNotExecute(() => {
  type ExpectType = Array<string | number>

  const guard = arrayOf(or(isNumber, isString))

  // @ts-expect-error
  test<ExpectData>(x)

  if (guard(x)) {
    test<ExpectType>(x)
    // @ts-expect-error
    test<Array<string>>(x)
    // @ts-expect-error
    test<Array<number>>(x)
  }
})

doNotExecute(() => {
  type Person = {
    name: string
    friend: Dog
  }
  class Dog {}

  function isDog(_x: unknown): _x is Dog {
    return _x instanceof Dog
  }

  const guard = objectOf({
    name: isString,
    friend: isDog,
  })

  // @ts-expect-error
  test<Person>(x)

  if (guard(x)) {
    test<Person>(x)
    test<string>(x.name)
    test<Dog>(x.friend)
  }
})
