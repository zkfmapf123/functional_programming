/**
 * nodemon --exec ts-node fp-more/index.ts
 * 불변성, immutability
 */

const x = 3
// x = 4 // Error

const isEven = (x: number) => x % 2 === 0

const apply =
  <T, K>(f: (a: T) => K) =>
  (a: T): K =>
    f(a)

const x2 = apply(isEven)(x)
console.log(x2)
