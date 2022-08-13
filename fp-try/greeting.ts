import * as _ from './_'

/**
 * nodemon --exec ts-node fp-try/useFlatMap.ts
 */

export const greeting = <T extends string, K>(msg: T, fn1: (a: T) => K, fn2: (a: K) => K, fn3: (a: K) => K) => {
  // 명령형 코드
  // const a = fn1(msg)
  // const b = fn2(a)
  // const c = fn3(b)

  /**
   * @todo
   * refac func
   */
  return fn3(fn2(fn1(msg)))
}

{
  // use throw
  console.log('----- use throw ------')
  const f = (str: string) => {
    if (str === '') throw new Error('not string')
    return str.length * 2
  }

  const g = (num: number) => {
    if (num === 0) throw new Error('num is zero')
    return num + 10
  }

  const h = (num: number) => {
    if (num === 0) throw new Error('num is zero')
    return num * 20
  }

  ;(() => {
    const result = greeting('hello world', f, g, h)
    console.log(result)
  })()
}

{
  // use Try Type
  console.log('----- use Try ------')
  const f = (str: string): _.Try<string, number> => {
    if (str === '') return _.failed('not string')

    return _.success(str.length * 2)
  }

  const g = (num: number): _.Try<string, number> => {
    if (num === 0) return _.failed('num is zero')
    return _.success(num + 10)
  }

  const h = (num: number): _.Try<string, number> => {
    if (num === 0) return _.failed('num is zero')
    return _.success(num * 20)
  }

  ;(() => {})()
}
