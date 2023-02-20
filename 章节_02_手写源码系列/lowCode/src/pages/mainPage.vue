<template>
  <div class="hello">
    <div class="header">
      <div class="header-logo">
        <img src="../assets/logo.png" alt="logo" />
        <strong>低代码练习生</strong>
      </div>
      <div class="header-btn">
        <span>预览</span>
        <span>保存</span>
      </div>
    </div>
    <div class="main-content">
      <el-row>
        <el-col :span="4">
          <!-- 物料堆 -->
          <div class="component-stack block">
            <div class="component-title">物料堆</div>
            <ul>
              <li
                v-for="(item, index) in stacks"
                :key="index"
                class="component-item"
                :draggable="true"
                @drag="handleDrag(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="stage block" @dragover.prevent>
            <!-- 渲染引擎 -->
            <render-engine ref="engine"
              @pickType="handlePickType" :addNode="selectedType"
              :jsonSchema="currentJson"
            ></render-engine>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="config-panel block">
            <div class="component-title">
              配置面板
              <config-panel
                :currentPickType="currentPickType"
              ></config-panel>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 渲染引擎
import engine from '../fragments/renderEngine.vue'
// import configPanel from '../fragments/configPanel.vue'
// 配置面板
import configPanel from '../config/core/configPanel.vue'
export default {
  name: "MainPage",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      // 需要加到配置系统中的组件 - 权限归类
      stacks: ["CButton", "CInput", "Container", "CTable", "CChart"],
      // 数据库拿到的协议
      jsonSchema: {
        page: {
          type: "Container",
          children: [
            {
              type: "Container",
              children: [
                {
                  type: "CInput",
                },
                {
                  type: "CButton",
                },
              ],
            },
            {
              type: "CChart",
            },
            {
              type: "Container",
              children: [
                {
                  type: "CInput",
                },
                {
                  type: "CTable",
                },
              ],
            },
          ],
        },
      },
      // 当前操作的数组
      currentJson: {},
      // 物料堆中，当前拾取类型
      selectedType: "",
      // 舞台中，当前选中类型
      currentPickType: "",
    };
  },
  methods: {
    handleDrag(item) {
      this.selectedType = item;
    },
    handlePickType(type) {
      this.currentPickType = type;
    },
  },
  created() {
    this.currentJson = this.jsonSchema;
  },
  components: {
    renderEngine: engine,
    configPanel
  },
};
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
