/**
 * nodemon --exec ts-node fp-function/map.ts
 */

export const curry =
  <A, B, C>(f: (a: A, b: B) => C) =>
  (a: A) =>
  (b: B) =>
    f(a, b)

export const _map = <A, B>(arrs: A[], fn: (a: A) => B): B[] => {
  const result: B[] = []
  for (const arr of arrs) {
    result.push(fn(arr))
  }

  return result
}

const numbers = [1, 2, 3, 5, 6, 7, 8, 9, 10]
const isEven = (x: number) => x % 2 === 0

{
  // 1. use map
  const evenNumbers = _map(numbers, isEven)
  console.log(evenNumbers)
}

{
  // 2. use curry
  const curryMap = curry(_map)
  const evenNumbers = curryMap(numbers)(isEven)
  console.log(evenNumbers)
}
