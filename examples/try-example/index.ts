import * as _ from './_'
import { cart, Item } from './item'
import { T } from 'ramda'

console.clear()

type ParsedItem = { _tag: 'parsedItem' } & Item
type ParsedErrorItem = {
  [tag in 'name' | 'msg']: string
}
type ArrayItem = _.Try<ParsedErrorItem, ParsedItem>[]

const parseItem = (item: Item): _.Try<ParsedErrorItem, ParsedItem> => {
  if (item.quantity < 1) {
    return _.fail({
      name: item.name,
      msg: 'must have product quantity more than 1',
    })
  }

  if (item.quantity > 10) {
    return _.fail({
      name: item.name,
      msg: 'must have product quantity more than less 10',
    })
  }

  return _.success({
    _tag: 'parsedItem',
    ...item,
  })
}

const stockItem = (item: ParsedItem) => {
  return `
<li>
<h2>${item.name}</h2>
<div>가격: ${item.price}원</div>
<div>수량: ${item.quantity}상자</div>
</li>
`
}

const errorItem = (p: ParsedErrorItem): string => `
    <li style="color: red">
        <h2>${p.name}<h2>
        <h2>${p.msg}<h2>
    </li>
`

const outOfStockItem = (item: ParsedItem): string => {
  return `
<li class="gray">
<h2>${item.name} (품절)</h2>
<div class='strike'>가격: ${item.price}원</div>
</li>
`
}

const renderItem = (p: ParsedItem): string => {
  if (p.outOfStock) {
    return outOfStockItem(p)
  }

  return stockItem(p)
}

const totalCalculator = () => {}

const totalCount = (items: ArrayItem): string => {}

const totalPrice = (items: ArrayItem): string => {}

const list = (items: ArrayItem): string => {
  return `
        <ul>
            ${items
              .map((item) =>
                _.getNotExitsDefault(
                  _.map(item, (parsedItem) => renderItem(parsedItem)),
                  errorItem
                )
              )
              .reduce((updates, tag) => updates + tag, '')}
        </ul>
    `
}

/**
 * use Option Type
 * 에러 타입이라면 그대로의 값을 반환 -> 그게 아니라면 해당 fn 타입을 반환
 */
const render = (item: ArrayItem): void => {
  _.map(_.fromNot(document.getElementById('app')), (app) => {
    app.innerHTML = `
            <h1> 장바구니 </h1>
            ${list(item)}
            ${totalCount(item)}
            ${totalPrice(item)}
        `
  })
}

;(() => {
  render(cart.map(parseItem))
})()
