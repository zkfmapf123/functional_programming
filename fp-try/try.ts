import * as T from './_'

type ExtendsITem = {
  discountPrice: number
} & Item

export const item: ExtendsITem[] = [
  {
    code: 'tomato',
    outOfStock: false,
    name: '토마토',
    price: 7000,
    quantity: 2,
    discountPrice: 1000,
  },
  {
    code: 'orange',
    outOfStock: true,
    name: '오렌지',
    price: 15000,
    quantity: 3,
    discountPrice: 2000,
  },
  {
    code: 'tomato',
    outOfStock: false,
    name: '토마토',
    price: 10000,
    quantity: 1,
    discountPrice: 3000,
  },
]
/**
 * nodemon --exec ts-node fp-try/try.ts
 * try-catch 예외 처리
 */

{
  // use try-catch
  const tenDivideBy = (n: number): number | never => {
    if (n === 0) throw new Error('0 is not divide')
    else return 10 / n
  }

  const test = () => {
    const y = tenDivideBy(0) // Error를 throw로 뱉는것이아닌 -> 명시적인 타입으로 받는다 (Try)
    try {
      return y
    } catch (e) {
      console.error(e)
    }
  }

  test()

  /**
   * if문을사용하면 부수효과 발생 -> 함수형프로그램의 순수함수와는 다름..
   */
}

{
  // 참조 투명성
  /**
   * 표현식을 평가한 값으로 대체하거나
   * 또는 그 반대의 값을 표현식으로 대체하더라도 프로그램의 동작이 변하지 않는다.
   */
}

{
  // Example
  console.clear()

  const validateItem = (item: Item) => {
    if (item.quantity < 1) {
      throw new Error('must be product quantity more than 1')
    }

    if (item.quantity > 10) {
      throw new Error('you should by 10 more than less')
    }
  }

  const outOfStockItem = (item: Item): number => {
    return 0
  }

  const stockItem = (item: Item): number => {
    return 0
  }

  const renderItem = (item: Item): number => {
    try {
      validateItem(item)

      if (item.outOfStock) {
        return outOfStockItem(item)
      }

      return stockItem(item)
    } catch (e: any) {
      throw new Error(e)
    }
  }
}

{
  /**
   * better
   * 예제에 존재
   */
}
