flua
----

[Fengari](https://fengari.io/) is great, but if you're unfamiliar with Lua it's useless. It simply tells you to read the Lua C documentation and if you're brave enough to read that you'll end up not understanding anything about the Lua stack, pushing stuff to the stack and who knows what. There's [a video](https://www.youtube.com/watch?v=5uhHkeVpcgo) that will teach you that in 40 minutes (or less if you accelerate it), but you may not that have these minutes. And you may not want to go to the trouble of converting JavaScript objects into Lua and vice-versa.

```
npm install flua
```

```js
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
```

Don't install [fengari from npm](https://www.npmjs.com/package/fengari). What you need is [fengari-web](https://www.npmjs.com/package/fengari-web). But since it doesn't work with Browserify you can include it with

```html
<script src="https://cdn.jsdelivr.net/npm/fengari-web@0.1.4/dist/fengari-web.js"></script>
```

and then you can use `window.fengari` instead of `require('fengari')` (on `example.js` I'm using [a browserify shim](https://github.com/rluba/browserify-global-shim)).
