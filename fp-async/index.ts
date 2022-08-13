/**
 * nodemon --exec ts-node fp-async/index.ts
 */

{
  // use direct
  const id = <T>(a: T): T => {
    return a
  }

  // continuation-passing style -> cps
  const cpsId = <T>(a: T, ret: (a: T) => void) => {
    ret(a)
  }

  ;(() => {
    const a = id('test')
    console.log(a)

    // 결과를 대입하는 코드
    cpsId('test cps', (params) => {
      console.log(params)
    })
  })()
}

{
  // Promise
  /**
   * Option<A> = None | Some<A>
   * Try<E,A> = Failed<E> | Success<A>
   * Async<A> = ???
   */

  type Async<T> = (ret: (x: T) => void) => void

  const resolve = <T>(a: T): Async<T> => {
    return (ret) => {
      ret(a)
    }
  }

  // (Async<T>, fn : (T) => Async<K>) : Async<K>
  const asyncFlatMap = <T, K>(a: Async<T>, fn: (a: T) => Async<K>): Async<K> => {
    return (ret) => {
      a((_a) => {
        const b = fn(_a)
        b((_b) => ret(_b))
      })
    }
  }

  const asyncMap = <T, K>(a: Async<T>, fn: (a: T) => K): Async<K> => {
    return asyncFlatMap(a, (_a) => resolve(fn(_a)))
  }

  const asyncRun = <T>(a: Async<T>) => {
    a(() => {
      return
    })
  }

  const f =
    (str: string): Async<number> =>
    (ret): void => {
      setTimeout(() => {
        console.log('f 호출 : ', str)
        ret(str.length * 2)
      }, 500)
    }

  const g =
    (num: number): Async<number> =>
    (ret) => {
      setTimeout(() => {
        console.log('g 호출 : ', num)
        ret(num + 1)
      }, 500)
    }

  const h =
    (num: number): Async<boolean> =>
    (ret) => {
      setTimeout(() => {
        console.log('h 호출 : ', num)
        ret(num % 3 === 0)
      }, 500)
    }

  /**
   * use Async (Func)
   */
  ;(() => {
    const a = f('test')
    const b = asyncFlatMap(a, (_a) => g(_a))
    const c = asyncFlatMap(b, (_b) => h(_b))
    const result = asyncMap(c, (_c) => (is) => {
      console.log(is)
    })
    asyncRun(result)
  })()
}
