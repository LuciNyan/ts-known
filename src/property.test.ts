import { describe, expect, it } from 'vitest'
import { hasUnknownProperty } from './property'

describe('hasUnknownProperty', () => {
    it('should return true when the specified property is an unknown type', () => {
        expect(hasUnknownProperty({ name: 'John' }, 'age')).toBe(false)
        expect(hasUnknownProperty({ age: 30 }, 'age')).toBe(true)
    })
    
    it('should return false when the specified property does not exist', () => {
        expect(hasUnknownProperty({ name: 'John' }, 'age')).toBe(false)
    })
    
    it('should return false when the value is not an object', () => {
        expect(hasUnknownProperty(123, 'age')).toBe(false)
        expect(hasUnknownProperty('John', 'age')).toBe(false)
        expect(hasUnknownProperty(true, 'age')).toBe(false)
        expect(hasUnknownProperty(null, 'age')).toBe(false)
        expect(hasUnknownProperty(undefined, 'age')).toBe(false)
    })
})

describe('hasProperty', () => {
    it('should return true when the specified property passes the guard function', () => {
    const person = { name: 'John', age: 30 }
    expect(hasProperty(person, 'name', isString)).toBe(true)
    expect(hasProperty(person, 'age', isNumber)).toBe(true)
    })
    
    it('should return false when the specified property does not pass the guard function', () => {
        const person = { name: 'John', age: 30 }
        expect(hasProperty(person, 'name', isNumber)).toBe(false)
        expect(hasProperty(person, 'age', isString)).toBe(false)
    })
    
    it('should return false when the specified property does not exist', () => {
        const person = { name: 'John' }
        expect(hasProperty(person, 'age', isNumber)).toBe(false)
    })
    
    it('should return false when the value is not an object', () => {
        expect(hasProperty(123, 'age', isNumber)).toBe(false)
        expect(hasProperty('John', 'age', isNumber)).toBe(false)
        expect(hasProperty(true, 'age', isNumber)).toBe(false)
        expect(hasProperty(null, 'age', isNumber)).toBe(false)
        expect(hasProperty(undefined, 'age', isNumber)).toBe(false)
    })
})

describe('hasProperties', () => {
    it('should return true when all specified properties pass their respective guard functions', () => {
        const person = { name: 'John', age: 30, address: { city: 'New York' } }
        const guardByProperty = { name: isString, age: isNumber, address: make({ city: isString }) }
        expect(hasProperties(person, guardByProperty)).toBe(true)
    })
    
    it('should return false when at least one specified property does not pass its respective guard function', () => {
        const person = { name: 'John', age: '30', address: { city: 'New York' } }
        const guardByProperty = { name: isString, age: isNumber, address: make({ city: isString }) }
        expect(hasProperties(person, guardByProperty)).toBe(false)
    })
    
    it('should return false when at least one specified property does not exist', () => {
        const person = { name: 'John', age: 30 }
        const guardByProperty = { name: isString, age: isNumber, address: make({ city: isString }) }
        expect(hasProperties(person, guardByProperty)).toBe(false)
    })
})