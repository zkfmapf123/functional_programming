/**
 * nodemon --exec ts-node solution/map_수정하기.ts
 */

// Data
interface Item {
  code: 'tomato' | 'orange' | 'apple'
  outOfStock: boolean
  name: string
  price: number
  quantity: number
}

const card: Array<Item> = [
  {
    code: 'tomato',
    outOfStock: false,
    name: '토마토',
    price: 7000,
    quantity: 2,
  },
  {
    code: 'orange',
    outOfStock: true,
    name: '오렌지',
    price: 15000,
    quantity: 3,
  },
  {
    code: 'apple',
    outOfStock: false,
    name: '사과',
    price: 10000,
    quantity: 1,
  },
]

/**
 * Implementation
 * 요구사항
 * - 재고없는 상품을 제외하고 총 개수, 합계를 구하여라
 */

{
  console.log('------- Command Code -------')
  /**
   * 명령형 코드의 경우
   * 요구사항에따라서 코드가 더 생긴다
   * 또한 기존의 요구사항이 변경이 된다면 해당 요구사항도 반영이 되야한다
   * -> Side Effect
   */
  let totalCountPrice = 0
  let totalCount = 0
  for (let i = 0; i < card.length; i++) {
    const { quantity, price, outOfStock } = card[i]

    // 1. stock
    if (outOfStock) continue

    // 2. quantity count
    totalCount += quantity

    // 3. total count
    totalCountPrice += price
  }

  console.log(`totalCount : ${totalCount} EA`)
  console.log(`totalPrice : ${totalCountPrice} Won`)
}

{
  console.log('------- Function Code -------')
  /**
   * 함수형 프로그래밍
   */

  // 전체 목록 중 재고가 있는 상품만 getValue를 실행하고 그 값ㅇ르 모두 더한다

  // 1. 재고가 있는 상품만 분류하기
  // 2. 분류된 상품들에 대해서 getValue 실행하기
  // 3. getValue가 실행된 값 모두 더하기
  const totalCalc = (lists: Item[], property: keyof Item, getValue: (item: Item, property: keyof Item) => number) => {
    /**
     * 1. before refactoring
     */
    // let total = 0
    // for (let i = 0; i < lists.length; i++) {
    //   if (!lists[i].outOfStock) {
    //     total += getValue(lists[i], property)
    //   }
    // }
    // return total

    /**
     * 2. bad Refactoring
     * 합성을 사용하지 않음... => 부수효과를 일으키는 void...
     */
    // const result: number[] = []
    // lists.forEach((item) => {
    //   if (!item.outOfStock) {
    //     result.push(getValue(item, property))
    //   }
    // })

    // return result.reduce((acc, cur) => acc + cur, 0)

    /**
     * 3. after refactoring
     * method chaining
     */
    return lists
      .filter((item) => !item.outOfStock)
      .map((item) => getValue(item, property))
      .reduce((total, cur) => total + cur, 0)
  }

  const getTotal = (lists: Item[], property: keyof Item) => {
    return totalCalc(lists, property, (list, property) => list[property] as number)
  }

  console.log(`totalCount : ${getTotal(card, 'quantity')} EA`)
  console.log(`totalPrice : ${getTotal(card, 'price')} Won`)
}

{
  // 다중 for문 함수형 프로그래밍으로 해결하기

  // for-loop
  const suits = ['spade', 'heart', 'clova', 'diamond']
  const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A']

  let count = 0
  for (let i = 0; i < suits.length; i++) {
    console.log(suits[i])
    for (let j = 0; j < numbers.length; j++) {
      count += 1
      //   console.log(numbers[j])
    }
  }

  console.log('total card : ', count)

  // use functional

  /**
   * 1. 카드는 무늬와 숫자를 연결한 문제열 (서로 의존) -> 중첩
   * 2. 중첩배열을 -> 배열로 풀어야한다
   *
   * ***** Array<Array<T> => Array<T> -> flat
   * ***** flatMap 중첩배열을 -> 배열로 풀어주는 메서드
   */
  const results = suits.flatMap((suit) => numbers.map((number) => `${suit} ${number}`))

  console.log(results)
}

/**
 * map의 잘못된 예
 * map함수같은 경우에는 값의 리턴을 하게 되는데, 이때 if문같은 조건이 걸렸을때 해당 조건에 부합하지 않다면
 * void로 리턴이된다.
 * void는 부수효과를 발생하는 원인이기 때문에
 *
 * 분기문을 통한 간단한 로직같은 경우에는 forEach를 사용한다.
 * 하지만 함수형 프로그래밍 원칙에는 map, filter, reduce를 사용하는 것을 준수한다.
 * 물롬 해당 함수들을 사용하여 성능상 좋은 이점을 가지지 못할수 있지만,
 * 협업하는 과정에서 의사소통이나, 보다 보기좋은 코드를 중점으로 한다.
 *
 * 또한 코드의 성능이 문제가 될때는
 * Iterator나 String으로 Lazy한 방법으로 이를 해결할 수 있다
 */
