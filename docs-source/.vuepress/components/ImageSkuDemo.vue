<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：SKU 行图片</h4>
        <ul>
          <li>设置 `image-mode="sku"` 为表格自动追加图片列</li>
          <li>通过 `image-component` 渲染行内上传控件，`on-image-change` 响应变更</li>
        </ul>
      </div>
      <SkuForm
        v-model:attribute="attribute"
        v-model:sku="sku"
        :source-attribute="sourceAttribute"
        :structure="structure"
        image-mode="sku"
        :image-component="imageComponent"
        :resolve-image-props="resolveImageProps"
        :on-image-change="onImageChange"
      />
    <el-row type="flex" :gutter="20" style="margin-top:10px;">
      <el-col>
        <el-divider content-position="left">attribute 数据</el-divider>
        <pre><code>{{ json(attribute) }}</code></pre>
      </el-col>
      <el-col>
        <el-divider content-position="left">sku 数据</el-divider>
        <pre><code>{{ json(sku) }}</code></pre>
      </el-col>
    </el-row>
    </div>
  </DemoBlock>
  <el-divider content-position="left">上传组件代码</el-divider>
  <DemoBlock :code="uploaderSource" />
</template>

<script>
import { markRaw } from 'vue'
import DemoUploader from './DemoUploader.vue'
import DemoBlock from './DemoBlock.vue'
import source from './ImageSkuDemo.vue?raw'
import uploaderSource from './DemoUploader.vue?raw'
export default {
  name: 'ImageSkuDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      uploaderSource,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金'] },
        { name: '内存', item: ['16G'] }
      ],
      structure: [
        { name: 'price', type: 'input', label: '价格' },
        { name: 'stock', type: 'input', label: '库存' }
      ],
      attribute: [],
      sku: [],
      imageComponent: markRaw(DemoUploader)
    }
  },
  methods: {
    resolveImageProps(scope) { return { row: scope.row?.sku } },
    onImageChange(payload) { /* 可按需处理 */ },
    json(v) { return JSON.stringify(v, null, 2) }
  }
}
</script>
