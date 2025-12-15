<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：自定义验证</h4>
        <ul>
          <li>在 `structure` 的列上提供 `validate(data, index, callback)`</li>
          <li>本例校验库存不少于 10，失败时通过回调返回错误</li>
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
import source from './ValidateDemo.vue?raw'
export default {
  name: 'ValidateDemo',
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
        { name: 'stock', type: 'input', label: '库存', tip: '库存数不能少于10', required: true, validate: (data, index, callback) => { if (data[index].stock && parseInt(data[index].stock) < 10) { callback(new Error('库存不能小于10')) } callback() } }
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
