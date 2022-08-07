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
})
