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
    const a = { foo: 'hello', bar: 123, baz: false }
    if (guard(a)) {
      console.log(a.ba)
    }

    expect(guard({ foo: 'hello', bar: 123, baz: false })).toBe(true)
    expect(guard({ foo: 'world', bar: '123', baz: false })).toBe(false)
    expect(guard({ foo: 'hello', bar: 123 })).toBe(false)
  })

  it('1', () => {
    const guard = make<Elem>({
      name: isString,
      ref: SELF,
    })

    const elem: any = { name: 'element' }
    elem.ref = elem

    expect(guard(elem)).toBe(true)
  })

  it('2', () => {
    const guard = make<Elem>({
      name: isString,
      ref: SELF,
    })

    const elem: any = { name: 'element' }
    elem.abc = elem

    expect(guard(elem)).toBe(false)
  })
})
