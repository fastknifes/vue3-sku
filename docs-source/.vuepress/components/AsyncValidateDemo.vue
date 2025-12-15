<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：异步验证</h4>
        <ul>
          <li>在列的 `validate` 中执行异步逻辑（如唯一性校验）</li>
          <li>本例输入 123 时模拟返回“编码已存在”的错误</li>
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
import source from './AsyncValidateDemo.vue?raw'
export default {
  name: 'AsyncValidateDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G', '32G'] }
      ],
      structure: [
        { name: 'code', type: 'input', label: '商品唯一编码', tip: '模拟异步操作，如果输入123则会提示编码已存在', required: true, validate: (data, index, callback) => { setTimeout(() => { if (data[index].code == '123') { callback(new Error('商品唯一编码已存在')) } callback() }, 1000) } },
        { name: 'price', type: 'input', label: '价格' },
        { name: 'stock', type: 'input', label: '库存' }
      ],
      attribute: [],
      sku: []
    }
  },
  methods: {
    submit() { this.$refs.skuForm.validate(valid => {}) },
    json(v) { return JSON.stringify(v, null, 2) }
  }
}
</script>
