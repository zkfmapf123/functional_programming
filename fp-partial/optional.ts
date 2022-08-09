import * as _ from './option'
/**
 * nodemon --exec ts-node fp-partial/optional.ts
 * 부분함수
 * 주어진 인자에 대응되는 반환값이 없으면 어떻게 되나?
 * -> 타입에 포함된 임의의 값을 대신 반환한다.. (number | undefined)
 */

{
  // 입력에 대응되는 값을 찾지 못할 때
  const arr = ['apple', 'banana', 'orange']

  arr.indexOf('apple') // 0
  arr.indexOf('melon') // -1
}

export interface Item {
  readonly code: string
  readonly outOfStock: boolean
  readonly name: string
  readonly price: number
  readonly quantity: number
  readonly discountPrice?: number
}

export const cart: Item[] = [
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

{
  console.log('------ if -------')
  // if문으로 로직
  const stockItem = (item: Item): void => {
    if (!item.outOfStock) {
      console.log('이름 : ', item.name)

      if (item?.discountPrice) {
        console.log('가격 : ', item.price - item?.discountPrice, ' *할인*')
      } else {
        console.log('가격 : ', item.price)
      }

      console.log('수량 : ', item.quantity)
    } else {
      console.log('이름 : ', item.name, ' 품절')
    }

    console.log('\n')
  }

  const calc = (lists: Item[], property: keyof Item) => {
    return totalCalculator(lists, property, (list, property) => list[property] as number)
  }

  const totalCalculator = (lists: Item[], property: keyof Item, f: (list: Item, property: keyof Item) => number) => {
    return lists
      .filter((list) => !list.outOfStock)
      .map((list) => f(list, property))
      .reduce((acc, cur) => acc + cur, 0)
  }

  cart.map(stockItem)
  console.log(calc(cart, 'price'))
  console.log(calc(cart, 'discountPrice'))
}

{
  // option Type
  // 함수형 프로그래밍에서는 값의 변경을 허용하지 않는다 -> readonly
  type Some<T> = {
    readonly _tag: 'Some'
    readonly value: T
  }

  type None = {
    readonly _tag: 'None'
  }

  type Option<K> = Some<K> | None

  const some = <K>(value: K): Option<K> => ({
    _tag: 'Some',
    value,
  })

  const none = <K>(): Option<K> => ({
    _tag: 'None',
  })

  // use Type Guard
  const isSome = <K>(oa: Option<K>): oa is Some<K> => oa._tag === 'Some'
  const isNone = <K>(oa: Option<K>): oa is None => oa._tag === 'None'

  // option 사용
  const stockItem = (item: Item): void => {
    if (!item.outOfStock) {
      console.log('이름 : ', item.name)

      if (item?.discountPrice) {
        console.log('가격 : ', item.price - item?.discountPrice, ' *할인*')
      } else {
        console.log('가격 : ', item.price)
      }

      console.log('수량 : ', item.quantity)
    } else {
      console.log('이름 : ', item.name, ' 품절')
    }

    console.log('\n')
  }
}

{
  console.log('--------- fp ----------')
  // refactoring

  const stockItem = (item: Item): void => {
    const optionDiscountPrice = _.fromUndefined(item.discountPrice)
    const discountPrice = _.getOrElse(optionDiscountPrice, 0)

    console.log(discountPrice)
  }
  stockItem(cart[0])
}
