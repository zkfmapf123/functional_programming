/**
 * Option => Some | None
 * Try => Fail | Some
 */

export type Success<K> = {
  readonly _tag: 'success'
  readonly result: K
}

export type Failed<K> = {
  readonly _tag: 'failed'
  readonly error: K
}

export type Try<K, T> = Failed<K> | Success<T>

/**
 * 사용하지 않는 타입은 never로 지정한다
 */
export const success = <T>(result: T): Try<never, T> => ({
  _tag: 'success',
  result,
})

export const failed = <T>(error: T): Try<T, never> => ({
  _tag: 'failed',
  error,
})

export const isSuccees = <T>(ta: Try<unknown, T>): ta is Success<T> => ta._tag === 'success'
export const isFailed = <T>(ta: Try<T, unknown>): ta is Failed<T> => ta._tag === 'failed'

export const getOrElse = <T, K>(ta: Try<T, K>, defualtValue: (e: T) => K): K => {
  // 에러가 있을 경우 기본값을 사용한다
  if (isFailed(ta)) return defualtValue(ta.error)
  // 결과가 성공이라면 해당 값을 사용한다
  return ta.result
}

/**
 * 성공했을 때 변경이 되지만,
 * 에러의 경우 변경이 되지 않는다 -> 변경...
 */
export const tryMap = <E, A, B>(ta: Try<E, A>, f: (a: A) => B): Try<E, B> => {
  if (isFailed(ta)) return ta
  return success(f(ta.result))
}
