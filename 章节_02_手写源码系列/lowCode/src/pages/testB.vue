<script>
export default {
  name: "testB",
  render(h, context) {
    console.log(context);
    return h("div",null,'testB组件');
  },
};
</script>
