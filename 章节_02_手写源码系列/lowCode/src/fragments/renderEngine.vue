<script>
/**
 * 渲染根结点
 * 引入动态挂载组件信息集合
 * 深度优先，递归找嵌套的子组件并传给startRender
 * startRender接收组件信息，从物料堆里捞对应组件
 * 最终返回完整的dom结点 渲染
 */
import {components, parsers} from '../components'
export default {
  name:"renderEngine",
  props:{
    jsonSchema:{
      type: Object,
      default: ()=>{
        return {}
      }
    },
    addNode:{ // 用于拖拽组件逻辑中
      type: String,
      default: ''
    }
  },
  data(){
    return {
      page: undefined
    }
  },
  components:{
    ...components, // 此处是为了渲染container里的children组件
    ...parsers
  },
  created () {
    this.init()
  },
  render(h){
    return this.renderRoot(h)
  },
  methods: {
    init(){
      this.page = this.jsonSchema.page || {}
    },
    // 渲染根结点
    renderRoot(h){
      // renderComponents：深度优先，寻找嵌套的子组件
      let _page = this.page
      // 后期拓展 => 全局配置信息
      return (
        <div class='root'>
          {this.renderComponents(h, _page)}
        </div>
      )
    },
    // 组件渲染
    renderComponents(h, section){
      // section为页面信息
      let _children = null

      if(section.children){
        _children = this.renderChildren(h, section)
      }
      return this.startRender(h, section, _children)
    },
    // 子组件渲染
    renderChildren(h, section){ 
      // [].concat(section)不写也行
      // [].concat([1,2,3])  [1,2,3]
      let _nodeArray = section.children || [].concat(section)
      // 在此可以拓展兄弟节点之间的逻辑
      return _nodeArray.map(item=>this.renderComponents(h,item))
    },
    // 渲染单个组件
    startRender(h, section, _children){
      const _type = section.type
      // 去物料堆捞对应的组件 并 渲染
      const renderMod = parsers[_type]
      // renderMod.render的写法 使得 物料堆里parser-组件.js的配置逻辑需要有个render方法
      // 不同组件不同作用域，继承物料，用当前的h, section, _children去执行物料里的render
      if(renderMod){
        console.log(section, _children)
        /**
         * 根据jsonSchema配置信息
         * 渲染顺序-根据递归逻辑如下(渲染子组件的逻辑parser-xx.js配合xxx.vue通过slot实现)
         * CInput      _children为null                                渲染CInput
         * CButton     _children为null                                渲染CButton
         * Container   _children为[CInput vNode, CButton vNode]       渲染Container以及其_children
         * CChart      _children为null                                渲染CChart
         * CInput      _children为null                                渲染CInput
         * CTable      _children为null                                渲染CTable
         * Container   _children为[CInput vNode, CTable vNode]        渲染Container以及其_children
         * Container   _children为[jsonSchema.page.children所有vNode] 渲染Container以及其_children
         */
        return renderMod.render.call(this, h, section, _children)
      }
      return null
    },
    // 以下为配置系统统一化处理逻辑
    // 拖拽组件经过触发
    handleDragOver(){

    },
    // 拖拽组件松手
    handleDrop(event, vm){
      // 改变Json配置数据的内容，让其渲染新Json配置
      console.log(event, vm)
      const _json = vm.jsonSchema

      if (_json && _json.type === 'Container') {
        if (!_json.children) {
          this.$set(_json, 'children', [])
        }
        _json.children.push({
          type: this.addNode
        })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .block {
    border: 1px solid var(--lightBg);
    height: 100vh;
  }

  .header {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .header-logo {
    display: flex;
    align-items: center;
  }

  .header img {
    width: 80px;
    height: 80px;
  }

  /* 物料堆 */
  .component-title {
    padding: 10px;
  }
  .component-item {
    border: 1px solid var(--mainLine);
    margin: 2px 5px;
    padding: 10px 0;
    border-radius: 18px;
  }

</style>