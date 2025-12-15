<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：组表联动图片</h4>
        <ul>
          <li>设置 `image-mode="linked"`，按策略将组图片映射到 SKU 行</li>
          <li>示例使用 `linked-policy="lastUpdated"`，也可配置 `specificGroup` 或 `priority`</li>
          <li>开启 `propagate-on-table-edit` 允许表格编辑回写到规格组</li>
          <li>开启 `emit-sku-image-source` 输出图片来源组名</li>
        </ul>
      </div>
      <SkuForm
        v-model:attribute="attribute"
        v-model:sku="sku"
        :source-attribute="sourceAttribute"
        image-mode="linked"
        linked-policy="lastUpdated"
        :show-group-image-switch="true"
        :propagate-on-table-edit="true"
        :emit-sku-image-source="true"
        :image-component="imageComponent"
        :resolve-image-props="resolveImageProps"
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
import source from './ImageLinkedDemo.vue?raw'
import uploaderSource from './DemoUploader.vue?raw'
export default {
  name: 'ImageLinkedDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      uploaderSource,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'], enableImage: true },
        { name: '内存', item: ['16G', '32G'], enableImage: true }
      ],
      attribute: [],
      sku: [],
      imageComponent: markRaw(DemoUploader)
    }
  },
  methods: {
    resolveImageProps(scope) { return { level: scope.level, group: scope.groupName, item: scope.item?.name } },
    json(v) { return JSON.stringify(v, null, 2) }
  }
}
</script>
