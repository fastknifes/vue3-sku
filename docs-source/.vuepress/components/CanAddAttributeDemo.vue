<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：关闭可选属性</h4>
        <ul>
          <li>在 `source-attribute` 的规格组上设置 `canAddAttribute: false`</li>
          <li>用户不能在组内新增自定义子项，保持规格集合固定</li>
          <li>适合规范化配置场景，避免出现脏数据</li>
        </ul>
      </div>
      <SkuForm
        :source-attribute="sourceAttribute"
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
import source from './CanAddAttributeDemo.vue?raw'
export default {
  name: 'CanAddAttributeDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'], canAddAttribute: false },
        { name: '内存', item: ['16G', '32G'], canAddAttribute: false }
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
