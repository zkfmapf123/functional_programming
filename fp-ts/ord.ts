import {pipe} from "fp-ts/function"
import * as O from "fp-ts/Ord"
import {sort} from "fp-ts/ReadonlyArray"
import {concatAll, Semigroup} from "fp-ts/Semigroup"

/**
 * Ordering 순서
 */

// string, number, boolean
import * as S from "fp-ts/string"
import * as N from "fp-ts/number"
import * as B from "fp-ts/boolean"

/**
 * export interface Ord<A> extends Eq<A> {
 * readonly compare: (first: A, second: A) => Ordering }
 *
 * Ordering = -1 | 0 | 1
 */
const getSemiGroup = <A>(): Semigroup<O.Ord<A>> => ({
  concat: (x, y) =>
    O.fromCompare((a, b) => {
      const ordering = x.compare(a, b)
      return ordering !== 0 ? ordering : y.compare(a, b)
    }),
})

// tools

interface User {
  id: number
  name: string
  age: number
  rememberMe: boolean
}

const byName = pipe(
  S.Ord,
  O.contramap((_: User) => _.name),
)

const byAge = pipe(
  N.Ord,
  O.contramap((_: User) => _.age),
)

const byRememberMe = pipe(
  B.Ord,
  O.contramap((_: User) => _.rememberMe),
)

const semiGroupOrdUser = getSemiGroup<User>()

// implementation
const users: Readonly<User>[] = [
  {id: 1, name: "leedonggyu", age: 29, rememberMe: false},
  {id: 2, name: "limjeahyock", age: 28, rememberMe: true},
  {id: 3, name: "sinjunghyeon", age: 28, rememberMe: false},
  {id: 4, name: "kimhyeoncheol", age: 28, rememberMe: true},
]

{
  // use Sort -> Sort가 더 쉬운거 아닌가?
  const byAgeSort = users.sort((a, b) => a.age - b.age)
  console.log(byAgeSort)
}

{
  // 굳이? 이렇게 까지
  const byAgeOrder = concatAll(semiGroupOrdUser)(byAge)([byAge, byRememberMe])
  console.log(byAgeOrder)
}
