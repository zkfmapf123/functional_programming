/**
 * nodemon --exec ts-node fp-function/currying.ts
 * - 인자가 여러개인 함수를 인자가 하나인 함수들의 함수열 만들기
 * - 커링은 함수를 변환한다
 */

import { T } from 'ramda'

const curry =
  <K, T, J, M>(f: (a: K, b: T, c: J) => M) =>
  (a: K) =>
  (b: T) =>
  (c: J) =>
    f(a, b, c)

{
  /**
   * common case
   */
  const delivery = <T>(present: T, from: T, to: T): string => {
    return `
            send Product : ${present}
            send Person : ${from}
            to Person : ${to}
        `
  }
}

{
  /**
   * currying case
   */
  const delivery = <T>(present: T, from: T, to: T): string => {
    return `
            send Product : ${present}
            send Person : ${from}
            to Person : ${to}
        `
  }

  /**
   * 커링된 함수를 사용하는 것보다,
   * curry 함수를 사용많이 사용한다.
   */

  const curriedDelivery = curry(delivery)

  const momsPresend = curriedDelivery('상품권')('엄마')

  //   console.log(momsPresend('아빠'))
}
