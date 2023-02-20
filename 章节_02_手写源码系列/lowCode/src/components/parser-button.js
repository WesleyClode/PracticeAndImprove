import cButton from './cButton.vue'
export default{
  name:'CButton',
  components:{
    cButton
  },
  render(h, section, children){
    console.log(h, section, children)
    const _this = this
    // 传递参数
    const _propsOn = {
      nativeOn:{
        click: (e)=>{
          e.stopPropagation();
          _this.$emit('pickType', 'cButton')
        }
      }
    }
    return (
      <cButton {..._propsOn}></cButton>
    )
  }
}
