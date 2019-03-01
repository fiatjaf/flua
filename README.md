flua
----

[Fengari](https://fengari.io/) is great, but if you're unfamiliar with Lua it's useless. It simply tells you to read the Lua C documentation and if you're brave enough to read that you'll end up not understanding anything about the Lua stack, pushing stuff to the stack and who knows what. There's [a video](https://www.youtube.com/watch?v=5uhHkeVpcgo) that will teach you that in 40 minutes (or less if you accelerate it), but you may not that have these minutes. And you may not want to go to the trouble of converting JavaScript objects into Lua and vice-versa.

```
npm install flua
```

```js
const flua = require('flua')

try {
  let {tojs} = flua.runWithGlobals({
    fromjs: 10,
    multiply: (value, times) => value * times
  }, 'tojs = multiply(fromjs, 3)', ['tojs'])
  console.log(tojs) // 30
} catch (e) {
  console.log(e)
}
```

(When passing functions from JavaScript to Lua, you can make them return an array. In that case it will translate into a Lua function that returns multiple values. If you want a Lua function that returns an array-table instead of multiple values, return an array with your desired array inside.)

If you want more control, see [example.js](example.js) or read the source for `runWithGlobals`.

Don't install [fengari from npm](https://www.npmjs.com/package/fengari). What you need is [fengari-web](https://www.npmjs.com/package/fengari-web). But since it doesn't work with Browserify you can include it with

```html
<script src="https://cdn.jsdelivr.net/npm/fengari-web@0.1.4/dist/fengari-web.js"></script>
```

and then you can use `window.fengari` instead of `require('fengari')` (on [example.js](example.js) I'm using [a browserify shim](https://github.com/rluba/browserify-global-shim)).
