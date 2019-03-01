/** @format */

const test = require('tape')
const flua = require('.')

test('basic', function(t) {
  t.plan(1)

  let {tojs} = flua.runWithGlobals(
    {
      fromjs: 10,
      multiply: (value, times) => value * times
    },
    'tojs = multiply(fromjs, 3)',
    ['tojs']
  )
  t.deepEqual(tojs, 30)
  t.end()
})

test('multireturn func', function(t) {
  t.plan(1)

  let {first, second, third} = flua.runWithGlobals(
    {
      multi: () => ['x', [true], {}]
    },
    `
        first, second, third = multi()
      `,
    ['first', 'second', 'third']
  )
  t.deepEqual([first, second, third], ['x', [true], {}])
  t.end()
})

test('bizarre objects', function(t) {
  t.plan(1)

  let globals = {
    m: {x: [true, false, 1.123, 'qwe']},
    n: [
      {},
      [[{b: {b: {b: {}}}}], [{x: [{x: [{}]}]}], [[{}, 1, 2, 3], [[{}], {}, {}]]]
    ]
  }

  let ret = flua.runWithGlobals(globals, '', ['m', 'n'])
  t.deepEqual(ret, globals)
  t.end()
})
