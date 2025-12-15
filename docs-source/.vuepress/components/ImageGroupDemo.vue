<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：规格组图片</h4>
        <ul>
          <li>开启 `show-group-image-switch` 后，可为组内子项上传图片</li>
          <li>通过 `image-component` 注入外部上传组件，`resolve-image-props` 传递上下文</li>
          <li>适合在联动模式下将组图片映射到 SKU 行</li>
        </ul>
      </div>
      <SkuForm
        v-model:attribute="attribute"
        v-model:sku="sku"
        :source-attribute="sourceAttribute"
        :show-group-image-switch="true"
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
import source from './ImageGroupDemo.vue?raw'
import uploaderSource from './DemoUploader.vue?raw'
export default {
  name: 'ImageGroupDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      uploaderSource,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'], enableImage: true },
        { name: '内存', item: ['16G', '32G'], enableImage: false }
      ],
      attribute: [],
      sku: [],
      imageComponent: markRaw(DemoUploader)
    }
  },
  methods: {
    resolveImageProps(scope) { return { group: scope.groupName, item: scope.item?.name } },
    json(v) { return JSON.stringify(v, null, 2) }
  }
}
</script>
