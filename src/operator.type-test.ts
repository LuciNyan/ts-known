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
