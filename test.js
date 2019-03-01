/** @format */

const test = require('tape')
const flua = require('.')

test('basic test', function(t) {
  try {
    let {tojs} = flua.runWithGlobals(
      {
        fromjs: 10,
        multiply: (value, times) => value * times
      },
      'tojs = multiply(fromjs, 3)',
      ['tojs']
    )
    console.log(tojs)
    t.deepEqual(tojs, 30)
    t.end()
  } catch (e) {
    console.log(e)
  }
})
