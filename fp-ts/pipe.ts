import {pipe} from "fp-ts/function"

/**
 * pipe
 *
 * a => b
 * b => c
 * c => d
 * d => f
 * ...
 *
 */
{
  const double = (n: number, v: number) => n * v
  const incre = (n: number) => n + 10
  const decre = (n: number) => n - 5

  const value = pipe(double(10, 2), incre, decre)
  console.log(value) // 25
}

{
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const selectNum = (arr: number[], isMax = true) =>
    isMax ? Math.max(...arr) : Math.min(...arr)

  const add = (n: number) => n + n
  const mul = (n: number) => n * n

  const value = pipe(selectNum(arr), add, mul)

  console.log(value) // 400
}

{
  const arr = [52, 62, 3, 4, 20, 1, 6, 29]

  const getBetweenNum = (arr: number[]) => [
    Math.max(...arr),
    Math.min(...arr),
    arr.length,
  ]

  const getBetweenAdd = ([max, min, len]: number[]) => [
    max + min,
    max - min,
    max + min + len,
  ]

  const value = pipe(getBetweenNum(arr), getBetweenAdd, (nums) =>
    nums.reduce((acc, cur) => acc + cur, 0),
  )

  console.log(value) // 195
}
