export type Some<T> = {
  readonly _tag: 'Some'
  readonly value: T
}

export type None = {
  readonly _tag: 'None'
}

export type Option<T> = Some<T> | None

// some && none
export const some = <T>(value: T): Option<T> => ({
  _tag: 'Some',
  value,
})

export const none = <T>(): Option<T> => ({
  _tag: 'None',
})

// check isSome && isNone
export const isSome = <T>(s: Option<T>): s is Some<T> => s._tag === 'Some'
export const isNone = <T>(n: Option<T>): n is None => n._tag === 'None'

/**
 * 값의 부재를 확인하기 위해 if문을 사용하는것을
 * 실용적이지 않을 수 있다.
 */

export const fromUndefined = <A>(a: A | undefined): Option<A> => {
  if (a === undefined) return none()
  return some(a)
}

export const getOrElse = <A>(oa: Option<A>, defaulfValue: A): A => {
  /**
   * 값이 없으면 지정된 값을 사용한다
   * 값이 있다면 해당 값을 사용한다
   */

  if (isNone(oa)) return defaulfValue
  return oa.value
}

export const optionMap = <T, K>(oa: Option<T>, f: (a: T) => K): Option<K> => {
  // 값이 없으면 값이 없는 상태를 유지한다
  if (isNone(oa)) return oa

  // 값이 있으면 값을 함수에 적용한댜
  return some(f(oa.value))
}
