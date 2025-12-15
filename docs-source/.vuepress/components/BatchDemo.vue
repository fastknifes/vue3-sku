<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：批量设置</h4>
        <ul>
          <li>当 SKU 行较多时自动启用批量设置，快速填充列</li>
          <li>可在列结构上通过 `batch: false` 关闭某列的批量设置</li>
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
import source from './BatchDemo.vue?raw'
export default {
  name: 'BatchDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G', '32G'] }
      ],
      structure: [
        { name: 'price', type: 'input', label: '价格' },
        { name: 'stock', type: 'input', label: '库存', batch: false }
      ],
      attribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G'] }
      ],
      sku: [
        { sku: '黑;16G', price: 85, stock: 100 },
        { sku: '金;16G', price: 85, stock: 50 },
        { sku: '白;16G', price: 85, stock: 50 }
      ]
    }
  },
  methods: {
    json(v) { return JSON.stringify(v, null, 2) }
  },
  methods: {}
}
</script>
