import { describe, expect, it } from 'vitest'
import { or, and } from './operator'
import { isString, isNumber, isBoolean } from './base'

describe('or', () => {
    it('should return true if value matches any of the guards', () => {
      const guard = or(isString, isNumber, isBoolean);
      expect(guard('foo')).toBe(true);
      expect(guard(123)).toBe(true);
      expect(guard(true)).toBe(true);
    });
  
    it('should return false if value does not match any of the guards', () => {
      const guard = or(isString, isNumber, isBoolean);
      expect(guard(undefined)).toBe(false);
      expect(guard(null)).toBe(false);
      expect(guard({})).toBe(false);
      expect(guard([])).toBe(false);
    });
});
  
describe('and', () => {
    it('should return true if value matches all of the guards', () => {
      const guard = and(isObject, hasProperty('name', isString));
      expect(guard({ name: 'John' })).toBe(true);
    });
  
    it('should return false if value does not match all of the guards', () => {
      const guard = and(isObject, hasProperty('name', isString));
      expect(guard(undefined)).toBe(false);
      expect(guard(null)).toBe(false);
      expect(guard({ name: 123 })).toBe(false);
      expect(guard({ age: 30 })).toBe(false);
    });
});
  