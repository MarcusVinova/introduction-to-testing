import { describe, expect, test } from 'vitest';
import { add, divide, multiply, subtract } from './arithmetic';

describe('add', () => {
  test('Add is defined', () => {
    expect(add(1, 2)).toBeDefined();
  });
  test('Should return the correct add', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, -1)).toBe(-2);
    expect(add(0.003, 0.006)).toBeCloseTo(0.009); 
  });
  test.each([
    [1, 1, 22],
    [1, 2, 32],
    [2, 1, 32],
  ])(
    'add(%i, %i) Should not equal %i and be less than or equal to it',
    (a, b, expected) => {
      expect(add(a, b)).not.toBe(expected);
      expect(add(a, b)).not.toBeGreaterThan(expected);
      expect(add(a, b)).toBeLessThanOrEqual(expected);
    },
  );
  test.each([
    [0, 5, 5, 'Addition with zero'],
    [Infinity, 1, Infinity, 'Addition with Infinity'],
    [NaN, 1, NaN, 'Addition with NaN'],
    [Number.MAX_SAFE_INTEGER, 1, Number.MAX_SAFE_INTEGER + 1, 'Large numbers'],
    [Number.MIN_VALUE, Number.MIN_VALUE, 2 * Number.MIN_VALUE, 'Small numbers'],
    [-5, 5, 0, 'Negative and positive cancellation'],
    [5, 5, 10, 'Self addition'],
  ])('%s: add(%f, %f) should be %f', (a, b, expected) => {
    if (isNaN(expected)) {
      expect(add(a, b)).toBeNaN();
    } else {
      expect(add(a, b)).toBeCloseTo(expected);
    }
  });
  test('add handles invalid inputs gracefully', () => {
    expect(() => add('a', 1)).toThrow('Inputs must be numbers');
    expect(() => add(undefined, 1)).toThrow('Inputs must be numbers');
  });
});

describe('subtract', () => {
  test('Subtract is defined', () => {
    expect(subtract(5, 3)).toBeDefined();
  });

  test('Should return the correct subtraction', () => {
    expect(subtract(5, 3)).toBe(2); // 5 - 3 = 2
    expect(subtract(10, 5)).toBe(5); // 10 - 5 = 5
  });


  test('Subtract handles invalid inputs gracefully', () => {
    expect(() => subtract('a', 1)).toThrow('Inputs must be numbers');
    expect(() => subtract(undefined, 1)).toThrow('Inputs must be numbers');
  });
});

describe('multiply', () => {
  test('Should multiply two numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6); // Kiểm tra phép nhân 2 * 3 = 6
    expect(multiply(-2, 3)).toBe(-6); // Kiểm tra phép nhân -2 * 3 = -6
  });

  test('Should return 0 when multiplying by zero', () => {
    expect(multiply(0, 5)).toBe(0); // Kiểm tra 0 * 5 = 0
  });

  test('Should throw an error when inputs are not numbers', () => {
    expect(() => multiply('a', 2)).toThrow('Inputs must be numbers'); // Kiểm tra lỗi khi đầu vào không phải số
  });
});

describe('divide', () => {
  test('Should return correct result for positive division', () => {
    expect(divide(6, 2)).toBe(3); 
  });


  test('Should return correct result for negative division', () => {
    expect(divide(-6, -2)).toBe(3); 
    expect(divide(-6, 2)).toBe(-3); 
    expect(divide(6, -2)).toBe(-3); 
  });

  test('Should return Infinity or -Infinity when dividing by zero', () => {
    expect(divide(10, 0)).toBe(Infinity); 
    expect(divide(-10, 0)).toBe(-Infinity); 
    expect(divide(0, 5)).toBe(0); // 0 / 5 = 0
    expect(divide(0, 0)).toBeNaN(); // 0 / 0 = NaN
  });

  test('Should return correct result for floating-point division', () => {
    expect(divide(0.1, 0.2)).toBeCloseTo(0.5, 5); // 0.1 / 0.2 = 0.5
    expect(divide(1.5, 0.5)).toBe(3); // 1.5 / 0.5 = 3
  });

  test('Should handle division with Infinity', () => {
    expect(divide(Infinity, 2)).toBe(Infinity); // Infinity / 2 = Infinity
    expect(divide(-Infinity, 2)).toBe(-Infinity); // -Infinity / 2 = -Infinity
    expect(divide(2, Infinity)).toBe(0); // 2 / Infinity = 0
    expect(divide(Infinity, Infinity)).toBeNaN(); // Infinity / Infinity = NaN
  });



  test('Should return 0 for dividing zero by a number', () => {
    expect(Object.is(divide(0, 20), 0)).toBe(true); // 0 / 20 = 0
    expect(Object.is(divide(0, -20), -0)).toBe(true); // 0 / -20 = -0
  });
});
