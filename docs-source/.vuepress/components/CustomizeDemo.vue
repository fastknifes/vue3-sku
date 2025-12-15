<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：自定义表格结构</h4>
        <ul>
          <li>通过 `structure` 定义列：字段名、类型、标签等</li>
          <li>支持 `input`、`slot` 等多种列类型，结合校验与提示</li>
          <li>与 `attribute/sku` 双向绑定，录入即更新</li>
        </ul>
      </div>
      <SkuForm
        :source-attribute="sourceAttribute"
        :structure="structure"
        v-model:attribute="attribute"
        v-model:sku="sku"
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
import source from './CustomizeDemo.vue?raw'
export default {
  name: 'CustomizeDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G', '32G'] }
      ],
      structure: [
        { name: 'originalprice', type: 'input', label: '原价' },
        { name: 'price', type: 'input', label: '现价' },
        { name: 'stock', type: 'input', label: '库存' }
      ],
      attribute: [],
      sku: []
    }
  },
  methods: {
    json(v) { return JSON.stringify(v, null, 2) }
  },
  methods: {}
}
</script>
