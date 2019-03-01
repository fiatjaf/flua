/** @format */

const fengari = require('fengari')
const flua = require('./lib/index.js')

const lua = fengari.lua
const lauxlib = fengari.lauxlib
const lualib = fengari.lualib

main()

function main() {
  const L = lauxlib.luaL_newstate()
  lualib.luaL_openlibs(L)

  flua.flua_setglobals(L, {
    a: {
      anumber: 12,
      astr: 'plic',
      anarr: [1, 'sete', null, false]
    },
    b: {b: {b: {b: {b: {b: 123}}}}},
    func: function xpri(a, b, c, b, e) {
      console.log('PRINT', a, b, c, d, e)
    }
  })

  let bad = lauxlib.luaL_loadstring(
    L,
    fengari.to_luastring(`
  print(b.b.b.b.b)
  print(b.b.b.b.b.b)
  for k, v in pairs(a) do
    print(k, v)
  end
  local value = a.value or {x='y'}
  a.value = value
  value.z = 'w'

  m = {}
  n = {1,2,3, nil}
  o = {a=false, b=nil}
    `)
  )

  if (bad) {
    console.log('code loading went bad:', bad)
    return
  }

  let err = lua.lua_pcall(L, 0, 0, 0)
  if (err) {
    console.log('execution went bad:', err)
    return
  }

  console.log('got globals', flua.flua_getglobals(L, ['a', 'm', 'n', 'o']))
}
