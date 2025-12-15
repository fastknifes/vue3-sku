<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：字段重命名</h4>
        <ul>
          <li>通过多组 `*Key` 配置重命名输出字段以对接后端契约</li>
          <li>示例将 `sku` 重命名为 `sku_code`，图片来源重命名为 `img_src_group`</li>
          <li>规格组与子项的命名也通过 `attribute*Key` 系列进行重命名</li>
        </ul>
      </div>
      <SkuForm
        v-model:attribute="attribute"
        v-model:sku="sku"
        :source-attribute="sourceAttribute"
        :structure="structure"
      :show-group-image-switch="true"
      image-mode="linked"
      linked-policy="lastUpdated"
      :emit-sku-image-source="true"
      :sku-key="'sku_code'"
      :sku-image-source-key="'img_src_group'"
      :image-column-name="'img'"
      :image-column-label="'图片'"
      :attribute-group-name-key="'group_name'"
      :attribute-items-key="'values'"
      :attribute-group-enable-image-key="'img_enabled'"
      :attribute-item-name-key="'value'"
      :attribute-item-image-key="'img_url'"
      :image-component="imageComponent"
    />
      <el-row type="flex" :gutter="20" style="margin-top:10px;">
        <el-col>
          <el-divider content-position="left">attribute 数据（自定义键）</el-divider>
          <pre><code>{{ json(attribute) }}</code></pre>
        </el-col>
        <el-col>
          <el-divider content-position="left">sku 数据（自定义键）</el-divider>
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
import source from './FieldRenameDemo.vue?raw'
import uploaderSource from './DemoUploader.vue?raw'
export default {
  name: 'FieldRenameDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      uploaderSource,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G', '32G'] }
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
    json(v) { return JSON.stringify(v, null, 2) }
  }
}
</script>
