export const _ = () => {
  const map = <A, B>(lists: A[], fn: (list: A) => B): B[] => {
    const results: B[] = []

    for (const v of lists) {
      results.push(fn(v))
    }

    return results
  }

  return {
    map,
  }
}
