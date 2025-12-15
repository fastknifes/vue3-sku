<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：主题风格</h4>
        <ul>
          <li>通过 `theme` 切换不同的表格/表单视觉风格</li>
          <li>本例在按钮中切换 `theme` 为 1/2 以演示差异</li>
        </ul>
      </div>
      <SkuForm
        :source-attribute="sourceAttribute"
        v-model:attribute="attribute"
        v-model:sku="sku"
        :theme="theme"
      />
      <el-button type="primary" style="margin-top: 10px;" @click="switchTheme">切换主题</el-button>
      <el-row type="flex" :gutter="20">
        <el-col>
          <el-divider content-position="left">attribute 数据</el-divider>
          <pre><code>{{ attribute }}</code></pre>
        </el-col>
        <el-col>
          <el-divider content-position="left">sku 数据</el-divider>
          <pre><code>{{ sku }}</code></pre>
        </el-col>
      </el-row>
    </div>
  </DemoBlock>
</template>

<script>
import DemoBlock from './DemoBlock.vue'
import source from './ThemeDemo.vue?raw'
export default {
  name: 'ThemeDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G', '32G'] }
      ],
      attribute: [],
      sku: [],
      theme: 1
    }
  },
  methods: {
    switchTheme() {
      this.theme = this.theme == 1 ? 2 : 1
    }
  }
}
</script>
