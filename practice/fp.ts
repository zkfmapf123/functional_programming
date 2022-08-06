/**
 * tomato : 7000
 * orange : 15000
 * apple : 10000
 */

const tomata = 7000
const ornage = 15000
const apple = 10000

{
  // command code
  // 부수효과가 발생한다
  let totalPrice = 0 // 전역변수
  totalPrice += tomata
  totalPrice += ornage
  totalPrice += apple

  // Error
  totalPrice += 30000
  totalPrice += 70000

  // console.log(totalPrice)
}

{
  // functional code
  function priceOfApple(): number {
    return apple
  }

  function priceOfOrange(): number {
    return ornage
  }

  function priceOfTomato(): number {
    return tomata
  }

  function getPrice(fruit: 'apple' | 'ornage' | 'tomato'): number {
    switch (fruit) {
      case 'apple':
        return priceOfApple()
      case 'ornage':
        return priceOfOrange()
      case 'tomato':
        return priceOfTomato()
      default:
        throw new Error(`${fruit} is not menu`)
    }
  }

  // 항상 같은 결과가 발생한다
  function list(): number {
    return priceOfApple() + priceOfOrange() + priceOfTomato()
  }

  function buy100Orange() {
    return priceOfOrange() * 100
  }
}

{
  // Record의 비효율성

  /**
   * Record 방식을 사용할 수 있으나,
   * 비효율적이다.
   */
  const priceOfFruit = {
    tomata: 7000,
    ornage: 10000,
    apple: 50000,
  }

  // Example

  // 1. command code
  const isEven = {
    tomata: true,
    orange: true,
    apple: false,
  }

  // 2. functional code
  const isEvenFn = (str: string) => str.length % 2 === 0
}

{
  type PriceType = number | undefined
  // 함수 합성
  function getPriceOfFruit(fruit: 'apple' | 'tomato' | 'orange'): PriceType {
    switch (fruit) {
      case 'apple':
        return 7000
      case 'orange':
        return 10000
      case 'tomato':
        return 15000
      default:
        throw new Error(`${fruit} is not menu`)
    }
  }

  const isExpensive = (price: PriceType) => {
    return (price ?? 0) > 10000
  }

  const isExpensivePrice = (price: PriceType): boolean => {
    return isExpensive(price)
  }

  const main = () => {
    return isExpensivePrice(getPriceOfFruit('tomato'))
  }

  // console.log(main())
}

{
  // use Generic + 합성

  /**
   * function의 이름은 f, g, h ...
   * 변수의 이름은 x, y, z ...
   */
  type PriceType = number | undefined
  type FruitType = 'apple' | 'tomato' | 'orange'
  // 함수 합성
  function getPriceOfFruit(fruit: FruitType): PriceType {
    switch (fruit) {
      case 'apple':
        return 7000
      case 'orange':
        return 10000
      case 'tomato':
        return 15000
      default:
        throw new Error(`${fruit} is not menu`)
    }
  }

  const isExpensive = (price: PriceType) => {
    return (price ?? 0) > 10000
  }

  const isExpensivePrice = (price: PriceType): boolean => {
    return isExpensive(price)
  }

  const compose =
    <A, B, C>(f: (x: A) => B, g: (price: B) => C) =>
    (x: A) => {
      return g(f(x))
    }

  // 매개변수를 지우면서 읽어라
  // <A, B, C>((A) => B, (B) => C) => (A)
}
