import { describe, expect, it } from 'vitest'

import { isBoolean, isNumber, isString } from './base'
import { make } from './make'
import { SELF } from './property'

type Elem = {
  name: string
  ref: Elem
}

describe('make', () => {
  it('should return a function that checks if an object has properties guarded by given guards', () => {
    const guard = make({
      foo: isString,
      bar: isNumber,
      baz: isBoolean,
    })

    expect(guard({ foo: 'hello', bar: 123, baz: false })).toBe(true)
    expect(guard({ foo: 'world', bar: '123', baz: false })).toBe(false)
    expect(guard({ foo: 'hello', bar: 123 })).toBe(false)
  })

  it('should return a function that checks if an object with circular reference is of correct type', () => {
    const guard = make<Elem>({
      name: isString,
      ref: SELF,
    })

    const elem: any = { name: 'element' }

    elem.abc = elem
    expect(guard(elem)).toBe(false)

    elem.ref = elem
    expect(guard(elem)).toBe(true)
  })
})
