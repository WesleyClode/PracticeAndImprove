<template>
   <div class="config-panel">
      <template v-if="editorJson">
          <!-- 模块渲染 -->
          <config-module v-for="(modJson, name) in editorJson" ref="module" :key="name"
              :modJson="modJson"
              :value="currentValue"
          ></config-module>
      </template>
  </div>
</template>
<script>
import json from '../json'
import configModule from './configModule'
let components = json.configs
// 根据类型获得当前组件配置信息
function getJson (type) {
  let component = components[type] || {}
  let panelConfig = component.panelCore || {}
  let _json = panelConfig.model || {}
  return _json
}
export default {
   name: 'configPanel',
   props: {
    currentPickType: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    configModule
  },
   data() {
    let _json = getJson(this.currentPickType)
    let defaultVal = _json.default
    let currentValue = this.value

    // 不存在或空对象
    if (!currentValue || Object.keys(currentValue).length === 0) {
      currentValue = defaultVal
    }

    return {
      currentValue: currentValue,
      editorJson: _json, // 当前组件配置信息
      store: {}
    }
   },
   watch: {
    currentPickType () {
      let _json = getJson(this.currentPickType)
      console.log('_json', _json)
      this.editorJson = _json
    }
  },
};
</script>