<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：数据还原</h4>
        <ul>
          <li>预置 `attribute` 与 `sku` 历史数据，进入页面自动恢复</li>
          <li>适合编辑旧配置或从后端拉取已有配置时的复原场景</li>
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
import source from './RecoveryDemo.vue?raw'
export default {
  name: 'RecoveryDemo',
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
      attribute: [
        { name: '颜色', item: ['黑', '金'] },
        { name: '内存', item: ['16G'] }
      ],
      sku: [
        { sku: '黑;16G', originalprice: 100, price: 80, stock: 100 },
        { sku: '金;16G', originalprice: 100, price: 85, stock: 50 }
      ]
    }
  },
  methods: {
    json(v) { return JSON.stringify(v, null, 2) }
  },
  methods: {}
}
</script>
