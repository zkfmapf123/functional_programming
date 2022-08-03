## Functional Programming

### Desc

- 프로그램을 작은 순수함수로 만들고 -> 합성
- 공통의 가능성을 추출하고 -> 합성을 통해 재사용 가능한 일반적 구성요소를 만든다

### Why FP?

- 명령형 코드는 -> 부수효과가 얽히고 장황해진다 -> 원래의 의도와는 다르게 동작한다 (부수효과)
  - Side Effect
  - 결과를 예측하기 어려움
- 함수형 코드는 -> 부수효과를 최소화 한다
  - 순서나 실행횟수와 상관없이 -> 항상 결과가 예측가능하다

### Example

```typescript
// 명령형 코드

for (let i = 0; i < 100; i++) {
  console.log(i)
}
```

```typescript
// 함수형 코드

function loop(fn, acc, list) {
  if (list.length === 0) return acc

  const [head, ...tail] = list
  return fn, fn(acc, head), tail
}

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => index + start)
const plus = (a, b) => a + b

console.log(loop(plus, 0, range(1, 100)))
```
