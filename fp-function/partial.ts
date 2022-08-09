/**
 * nodemon --exec ts-node fp-function/partial.ts
 *
 * partial application
 * - 인자가 여러개인 함수의 전체 인자중에 인자 몇개를 고정하여 더 작은 개수의 인자를 가지는 또 다른 함수를 생성 (부분 함수)
 */

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

  //   ;(() => {
  //     console.clear()

  //     console.log('\n', delivery('상품권', '엄마', '아빠'))
  //     console.log('\n', delivery('상품권', '엄마', '아빠'))
  //     console.log('\n', delivery('상품권', '엄마', '아빠'))
  //   })()
}

{
  /**
   * partial function
   * 부분 함수 합성
   */

  const delivery =
    <T>(present: T, from: T) =>
    (to: T): string => {
      return `
            send Product : ${present}
            send Person : ${from}
            to Person : ${to}
        `
    }

  ;(() => {
    console.clear()

    const momsPresent = delivery('상품권', '엄마')

    console.log('\n', momsPresent('아들'))
    console.log('\n', momsPresent('딸'))
    console.log('\n', momsPresent('아빠'))
  })()
}
