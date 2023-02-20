<script>
import testB from './testB.vue'
export default {
  name: "testA",
  render(h, context) { // 返回一个vNode
    console.log(context);
    console.log(testB.render.call(this, h))
    return h("div", {
      class: {
        foo: true,
        bar: false,
      },
      // 与 `v-bind:style` 的 API 相同，
      // 接受一个字符串、对象，或对象组成的数组
      style: {
        color: "red",
        fontSize: "14px",
      },
      // 普通的 HTML attribute
      attrs: {
        id: "foo",
      },
      // 组件 prop
      props: {
        myProp: "bar",
      },
    },
    [testB.render.call(this, h,{props:{myp:11}})]) // 必须是sting 或者 [vNode]
    // 或者
    // [testB.render(h,{props:{myp:11}})]) // 必须是sting 或者 [vNode]
  },
};
</script>
