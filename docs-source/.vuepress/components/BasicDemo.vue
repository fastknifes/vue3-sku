<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：基础功能</h4>
        <ul>
          <li>通过 `source-attribute` 定义规格组与子项</li>
          <li>使用 `v-model:attribute` 和 `v-model:sku` 双向绑定输出</li>
          <li>选择规格后自动生成 SKU 行并可在表格中录入数据</li>
        </ul>
      </div>
      <SkuForm
        v-model:attribute="attribute"
        v-model:sku="sku"
        :source-attribute="sourceAttribute"
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
import source from './BasicDemo.vue?raw'
export default {
  name: 'BasicDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G', '32G'] }
      ],
      attribute: [],
      sku: []
    }
  },
  methods: {}
}
</script>
