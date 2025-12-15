<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：异步加载与还原</h4>
        <ul>
          <li>启用 `async` 后，待数据加载完毕调用 `init()` 统一初始化</li>
          <li>本例通过按钮模拟依次加载 `source-attribute`、`attribute`、`sku`</li>
        </ul>
      </div>
      <SkuForm
        ref="skuForm"
        :source-attribute="sourceAttribute"
        :structure="structure"
        v-model:attribute="attribute"
        v-model:sku="sku"
        async
      />
      <el-button type="primary" :loading="loading" style="margin-top: 10px;" @click="load(1)">模拟加载数据1</el-button>
      <el-button type="primary" :loading="loading" style="margin-top: 10px;" @click="load(2)">模拟加载数据2</el-button>
      <el-button type="primary" :loading="loading" style="margin-top: 10px;" @click="load(3)">模拟加载数据3</el-button>
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
import source from './AsyncRecoveryDemo.vue?raw'
export default {
  name: 'AsyncRecoveryDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      loading: false,
      sourceAttribute: [],
      structure: [
        { name: 'originalprice', type: 'input', label: '成本价' },
        { name: 'price', type: 'input', label: '销售价' },
        { name: 'stock', type: 'input', label: '库存' }
      ],
      attribute: [],
      sku: []
    }
  },
  methods: {
    load(type) {
      this.loading = true
      if (type == 1) {
        setTimeout(() => {
          this.sourceAttribute = [
            { name: '颜色', item: ['黑', '金', '白'] },
            { name: '内存', item: ['16G', '32G'] }
          ]
          setTimeout(() => {
            this.attribute = [
              { name: '颜色', item: ['黑', '金'] },
              { name: '内存', item: ['64G'] }
            ]
            setTimeout(() => {
              this.sku = [
                { sku: '黑;64G', originalprice: '100', price: '80', stock: '100' },
                { sku: '金;64G', originalprice: '100', price: '85', stock: '50' }
              ]
              this.$refs.skuForm.init()
              this.loading = false
            }, 300)
          }, 300)
        }, 300)
      } else if (type == 2) {
        setTimeout(() => {
          this.sourceAttribute = [
            { name: '内存', item: ['16G', '32G'] },
            { name: '颜色', item: ['黑', '金', '白'] }
          ]
          setTimeout(() => {
            this.attribute = [
              { name: '内存', item: ['64G'] },
              { name: '颜色', item: ['红', '白'] }
            ]
            setTimeout(() => {
              this.sku = [
                { sku: '64G;红', originalprice: 10, price: 8, stock: 10 },
                { sku: '64G;白', originalprice: 10, price: 8, stock: 5 }
              ]
              this.$refs.skuForm.init()
              this.loading = false
            }, 300)
          }, 300)
        }, 300)
      } else {
        setTimeout(() => {
          this.sourceAttribute = [
            { name: '颜色', item: ['黑', '金', '白'] }
          ]
          this.attribute = []
          this.sku = []
          this.$refs.skuForm.init()
          this.loading = false
        }, 300)
      }
    }
  }
  ,
  methods: {
    json(v) { return JSON.stringify(v, null, 2) }
  }
}
</script>
