<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：插槽-文本</h4>
        <ul>
          <li>在 `structure` 中将列类型设为 `slot`，以自定义渲染</li>
          <li>本例使用 `#price` 与 `#totalPrice` 展示文本插槽</li>
          <li>`totalPrice` 非 SKU 属性（`skuProperty: false`），用于行内计算展示</li>
        </ul>
      </div>
      <SkuForm
        :source-attribute="sourceAttribute"
        :structure="structure"
        v-model:attribute="attribute"
        v-model:sku="sku"
      >
        <template #price="slotProps">
          {{ slotProps.row.price }}
        </template>
        <template #totalPrice="slotProps">
          {{ total(slotProps.row) }}
        </template>
      </SkuForm>
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
import source from './CustomizeSlotDemo.vue?raw'
export default {
  name: 'CustomizeSlotDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G', '32G'] }
      ],
      structure: [
        { name: 'price', type: 'slot', label: '现价' },
        { name: 'stock', type: 'input', label: '库存' },
        { name: 'totalPrice', type: 'slot', skuProperty: false, label: '总价', tip: '总价 = 价格 * 库存，如果价格或库存为空时，则不计算' }
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
    total(data) {
      let totalPrice = ''
      if (data.price && data.stock) {
        totalPrice = (parseFloat(data.price) * parseFloat(data.stock)).toFixed(2)
        totalPrice += ' 元'
      }
      return totalPrice
    }
  }
}
</script>
