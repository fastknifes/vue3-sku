<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：必填验证</h4>
        <ul>
          <li>在 `structure` 中为列设置 `required: true`</li>
          <li>调用 `validate()` 触发整表校验，失败时标注错误</li>
        </ul>
      </div>
      <SkuForm
        ref="skuForm"
        :source-attribute="sourceAttribute"
        :structure="structure"
        v-model:attribute="attribute"
        v-model:sku="sku"
      />
      <el-button type="primary" @click="submit" style="margin-top: 10px;">提交</el-button>
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
import source from './RequiredDemo.vue?raw'
export default {
  name: 'RequiredDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G', '32G'] }
      ],
      structure: [
        { name: 'price', type: 'input', label: '价格', required: true },
        { name: 'stock', type: 'input', label: '库存', required: true }
      ],
      attribute: [],
      sku: []
    }
  },
  methods: {
    submit() {
      this.$refs.skuForm.validate(valid => {})
    }
  }
}
</script>
