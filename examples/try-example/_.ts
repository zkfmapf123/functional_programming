export type Success<T> = {
  readonly _tag: 'success'
  readonly result: T
}

export type Failed<T> = {
  readonly _tag: 'failed'
  readonly error: T
}

/**
 * 해당 타입이 없을경우에은 -> never | unknown
 */
export type Try<E, T> = Failed<E> | Success<T>

/**
 *  Try
 */
export const success = <T>(result: T): Try<never, T> => ({
  _tag: 'success',
  result,
})

export const fail = <T>(error: T): Try<T, never> => ({
  _tag: 'failed',
  error,
})

/**
 *
 */
export const isSuccess = <T>(ta: Try<unknown, T>): ta is Success<T> => ta._tag === 'success'
export const isFailed = <T>(ta: Try<T, unknown>): ta is Failed<T> => ta._tag === 'failed'
export const getNotExitsDefault = <E, T>(ta: Try<E, T>, defaultValue: (e: E) => T) => {
  if (isFailed(ta)) return defaultValue
  return ta.result
}

/**
 *
 */
export const tryMap = <E, K, T>(ta: Try<E, K>, fn: (v: K) => T): Try<E, T> => {
  if (isFailed(ta)) return ta
  return success(fn(ta.result))
}

/**
 * Try 배열을 []로 풀어주는 함수
 */
export const keepSuceess = <E, T>(tas: Try<E, T>[]): T[] => {
  const ret = tas.flatMap((ta) => {
    if (isSuccess(ta)) return [ta.result]
    else return []
  })

  return ret
}

/**
 * Option
 */
type Some<T> = {
  _tag: 'some'
  result: T
}

type None = {
  _tag: 'none'
}

const some = <T>(result: T): Option<T> => ({
  _tag: 'some',
  result,
})

const none = (): Option<never> => ({
  _tag: 'none',
})

const isSome = <T>(result: Option<T>): result is Some<T> => result._tag === 'some'
const isNone = <T>(result: Option<T>): result is None => result._tag === 'none'

export type Option<T> = Some<T> | None

/**
 * handling undefined && null
 */
export const fromNot = <T>(a: T | undefined | null) => {
  if (!a) return none()
  return some(a)
}

export const map = <T, K>(ta: Option<T>, fn: (v: T) => K): Option<K> => {
  if (isNone(ta)) return ta
  return some(fn(ta.result))
}
