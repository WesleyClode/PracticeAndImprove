!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);let o=Array.prototype,r=Object.create(o);function i(t){for(let e=0;e<t.length;e++)s(t[e])}function c(t,e,n){s(n),Object.defineProperty(t,e,{get:()=>(console.log(">>get..."),n),set(t){console.log(">>set..."),t!==n&&(s(t),n=t)}})}["push","shift","pop","unshift","reverse","sort","splice"].forEach(t=>{r[t]=function(...e){console.log(">>调用劫持的原生方法："+t);let n,r=o[t].apply(this,e);switch(t){case"push":case"unshift":n=e;break;case"splice":n=e.slice(2)}return n&&i(n),r}});var l=class{constructor(t){Array.isArray(t)?(t.__proto__=r,i(t)):this.walk(t)}walk(t){let e=Object.keys(t);for(let n=0;n<e.length;n++){c(t,e[n],t[e[n]])}}};function u(t){let e=t.$options;e.data&&function(t){let e=t.$options.data;e=t._data="function"==typeof e?e.call(t):e||{};for(let n in e)a(t,"_data",n);s(t._data)}(t),e.computed,e.watch}function s(t){if("object"==typeof t&&null!=t)return new l(t)}function a(t,e,n){Object.defineProperty(t,n,{get:()=>t[e][n],set(o){t[e][n]=o}})}let p=0;var f=class{constructor(t,e,n=(()=>{}),o={}){this.vm=t,this.exprOrFn=e,"function"==typeof e&&(this.getter=e),this.cb=n,this.opts=o,this.id=p++,this.get()}get(){this.getter()}};const d=/\{\{((?:.|\r?\n)+?)\}\}/g,h={getValue:(t,e)=>e.split(".").reduce((t,e)=>t=t[e],t),compilerText(t,e){t.textContent=t.textContent.replace(d,(function(...t){return h.getValue(e,t[1])}))}};function y(t){this._init(t)}y.prototype._init=function(t){let e=this;e.$options=t,u(e),e.$options.el&&e.$mount()},y.prototype._update=function(){let t,e=this.$el,n=document.createDocumentFragment();for(;t=e.firstChild;)n.appendChild(t);console.log(n),function t(e,n){[...e.childNodes].forEach(e=>{1==e.nodeType?t(e,n):3==e.nodeType&&h.compilerText(e,n)})}(n,this),e.appendChild(n)},y.prototype.$mount=function(){let t=this,e=t.$options.el;e=t.$el=function(t){return"string"==typeof t?document.querySelector(t):t}(e);new f(t,()=>{console.log("watcher run"),t._update()})};new y({el:"#app",data:()=>({msg:"hello",school:{name:"aaa",age:10},arr:[1,2,3,{a:1}]}),computed:{},watch:{}})}]);
//# sourceMappingURL=bundle.js.map