import * as fn from './_'

describe('_ test', () => {
  const _ = fn._()

  it('map number[] -> string[] test', (done) => {
    const arr = [1, 2, 3, 4, 5]
    const strArr = _.map<number, string>(arr, (list) => {
      return `${list}`
    })

    expect(strArr).toMatchObject(['1', '2', '3', '4', '5'])
    done()
  })

  it('map test', (done) => {
    const arr = [1, 2, 3, 4, 5]

    const plusArr = _.map<number, number>(arr, (list) => {
      return list + 100
    })

    expect(plusArr).toMatchObject([101, 102, 103, 104, 105])
    done()
  })

  it('Type Guard', (done) => {
    type A = {
      tag: 'A'
    }
    type B = {
      tag: 'B'
    }
    type AorB = A | B

    const a: AorB = {
      tag: 'A',
    }
    const b: AorB = {
      tag: 'B',
    }

    const isA = (num: AorB): num is A => num.tag === 'A'
    const isB = (num: AorB): num is B => num.tag === 'B'

    const aa: A = {
      tag: 'A',
    }

    const bb: B = {
      tag: 'B',
    }

    expect(isA(aa)).toBe(true)
    expect(isB(bb)).toBe(true)
    expect(isA(bb)).toBe(false)
    done()
  })
})
