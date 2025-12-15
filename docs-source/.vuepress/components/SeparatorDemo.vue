<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：自定义连接符</h4>
        <ul>
          <li>通过 `separator` 配置 SKU 文本的分隔符，本例为 `__`</li>
          <li>`attribute` 预置已选规格，`sku` 预置历史数据用于校验/恢复</li>
          <li>适合对接后端使用自定义分隔规则的场景</li>
        </ul>
      </div>
      <SkuForm
        v-model:attribute="attribute"
        v-model:sku="sku"
        :source-attribute="sourceAttribute"
        separator="__"
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
import source from './SeparatorDemo.vue?raw'
export default {
  name: 'SeparatorDemo',
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
        { name: '内存', item: ['16G'] }
      ],
      sku: [
        { sku: '黑__16G', price: 80, stock: 100 }
      ]
    }
  },
  methods: {}
}
</script>
