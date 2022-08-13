/**
 * nodemon --exec ts-node fp-observable/index.ts
 * Promise -> 값이 한번만 전달된다.
 * Observable -> 값이 여러번 전달된다.
 * npm i rxjs
 */

{
  const promiseFunc = <T>(str: T, ret: (v: T) => void) =>
    new Promise((res, rej) => {
      setTimeout(() => {
        res(ret(str))
      }, 500)

      setTimeout(() => {
        res(ret(str))
      }, 1000)
    })

  const asyncFunc = <T>(str: T, ret: (v: T) => void) => {
    setTimeout(() => {
      ret(str)
    }, 500)

    setTimeout(() => {
      ret(str)
    }, 1000)
  }

  promiseFunc('proimse leedonggyu', (name) => console.log(name))
  asyncFunc('async leedonggyu', (name) => console.log(name))
}
