import {Observable, pipe} from "rxjs"
import {filter, take} from "rxjs/operators"

/**
 * nodemon --exec ts-node fp-observable/observable.ts
 */

type Async<T> = (ret: (a: T) => void) => void

// Iterable 내의 상태 갱신과 상태를 기반으로 값을 생성하는 함수
// type Iterators<T> = () => T

// 상태를 초기화하고 iterator를 생성하는 함수
// type Iterables<T> = () => Iterators<T>

// type Observer<T> = (a: T) => void
// type Observables<T> = (subscribe: Observer<T>) => void

{
  const isEven = (n: number) => n % 2 === 0
  //   const intergerObservable: Observables<number> = (subscribe) => {
  //     let i = 0
  //     setInterval(() => {
  //       i = i + 1
  //       subscribe(i)
  //     }, 1000)
  //   }

  const intergerObservable: Observable<number> = new Observable((subscribe) => {
    let i = 0
    setInterval(() => {
      i = i + 1
      subscribe.next(i)
    }, 1000)
  })

  console.log(intergerObservable.subscribe())

  const ns: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  //   const xs = ns.filter(isEven).slice(0, 3)

  // filter :: (A => boolean) => Observable<A> => Observable<A>
  const evenFilter = filter(isEven)
  const task3 = take(3)

  const task3EvenNumbers = pipe(filter(isEven), take(3))

  task3EvenNumbers(intergerObservable).subscribe({
    next: (n) => {
      console.log(n)
    },
  })
}
