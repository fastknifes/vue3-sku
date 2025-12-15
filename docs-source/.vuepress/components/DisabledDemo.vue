<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：禁用 SKU 配置</h4>
        <ul>
          <li>设置 `disabled` 使规格选择与表格编辑不可用</li>
          <li>适合展示只读数据或冻结配置的场景</li>
        </ul>
      </div>
      <SkuForm
        :source-attribute="sourceAttribute"
        v-model:attribute="attribute"
        v-model:sku="sku"
        :disabled="true"
      />
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
import source from './DisabledDemo.vue?raw'
export default {
  name: 'DisabledDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G', '32G'] }
      ],
      attribute: [
        { name: '颜色', item: ['黑'] },
        { name: '内存', item: ['16G', '32G'] }
      ],
      sku: [
        { sku: '黑;16G', price: 80, stock: 100 },
        { sku: '黑;32G', price: 80, stock: 100 }
      ]
    }
  },
  methods: {
    json(v) { return JSON.stringify(v, null, 2) }
  },
  methods: {}
}
</script>
