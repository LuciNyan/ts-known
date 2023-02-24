import { describe, expect, it } from "vitest";
import { make } from "./make";
import { isString, isNumber, isBoolean } from "./base";

describe("make", () => {
  it("should return a function that checks if an object has properties guarded by given guards", () => {
    const guardByProperty = {
      foo: isString,
      bar: isNumber,
      baz: isBoolean,
    };
    const guardObject = make(guardByProperty);

    expect(guardObject({ foo: "hello", bar: 123, baz: false })).toBe(true);
    expect(guardObject({ foo: "world", bar: "123", baz: false })).toBe(false);
    expect(guardObject({ foo: "hello", bar: 123 })).toBe(false);
  });
});
