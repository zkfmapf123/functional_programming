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

### Options vs Try

- Option

```
  에러난 사실만을 기록할 때
```

- Try

```
  에러난 이유를 가지고 오고싶을 때
```

### 명령형 vs 선언형

```
-- use Func 선언형
export const KeepSuccess =
  <E, R>(tas: Array<Try<E, R>>): Array<R> => {
    const ret = tas.flatMap((ta) => {
      if (isSuccess(ta)) return [ta.result];
      else return [];
    })
    return ret;
  }

-- use For (명령형)
export const KeepSuccessWithFor = <E, R>(tas: Array<Try<E, R>>): Array<R> => {
  const ret: Array<R> = [];
  for (const ta of tas) {
    if (isSuccess(ta)) {
      ret.push(ta.result);
    }
  }
  return ret;
}

// 함수형 프로그래밍에서는 선언형 프로그래밍을 지향한다.
// 명령형 코드가 나쁘다는 건 아니다.
// 선언적인 방식의 코드는 부수효과를 파악하고 격리한다는 점에서 선언적이 형태로 사용한다면 -> 사이드 이펙트를 피할 수 있다.
```
