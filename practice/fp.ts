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
  let totalPrice = 0
  totalPrice += tomata
  totalPrice += ornage
  totalPrice += apple

  // Error
  totalPrice += 30000
  totalPrice += 70000

  console.log(totalPrice)
}

{
  // functional code
  let totalPrice = 0

  function addTotmao() {
    totalPrice += tomata
  }

  function addOrnage() {
    totalPrice += ornage
  }

  function addApple() {
    totalPrice += apple
  }

  function list() {
    addTotmao()
    addOrnage()
    addApple()
  }

  function listOrange2() {
    addOrnage()
    addOrnage()
  }

  function listOrange100() {
    for (let i = 0; i < 100; i++) {
      addOrnage()
    }
  }

  // main
  function main() {
    listOrange100()
  }
}
