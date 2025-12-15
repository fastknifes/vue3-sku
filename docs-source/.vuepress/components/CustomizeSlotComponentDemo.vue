<template>
  <DemoBlock :code="source">
    <div>
      <div class="doc-explain">
        <h4>示例说明：插槽-组件</h4>
        <ul>
          <li>`score` 使用评分组件作为行内编辑控件</li>
          <li>`image` 使用上传组件作为行内编辑控件，并结合校验</li>
          <li>适合在表格中嵌入复杂交互组件的场景</li>
        </ul>
      </div>
      <SkuForm
        ref="skuForm"
        :source-attribute="sourceAttribute"
        :structure="structure"
        v-model:attribute="attribute"
        v-model:sku="sku"
      >
      <template #score="slotProps">
        <div>
          <el-rate v-model="slotProps.row.score" />
        </div>
      </template>
      <template #image="slotProps">
        <div class="image-upload-container">
          <el-image v-if="slotProps.row.image" :src="slotProps.row.image" :preview-src-list="[slotProps.row.image]" fit="cover" />
          <el-upload :show-file-list="false" action="#" :before-upload="beforeUpload" :on-success="res => imageUpload(res, slotProps)" class="images-upload">
            <el-button size="small">{{ slotProps.row.image ? '重新上传' : '上传图片' }}</el-button>
          </el-upload>
          <el-button v-if="slotProps.row.image" size="small" @click="imageRemove(slotProps)" />
        </div>
      </template>
    </SkuForm>
      <el-button type="primary" style="margin-top: 10px;" @click="submit">提交</el-button>
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
import source from './CustomizeSlotComponentDemo.vue?raw'
import { ElMessage } from 'element-plus'
export default {
  name: 'CustomizeSlotComponentDemo',
  components: { DemoBlock },
  data() {
    return {
      source,
      sourceAttribute: [
        { name: '颜色', item: ['黑', '金', '白'] },
        { name: '内存', item: ['16G', '32G'] }
      ],
      structure: [
        { name: 'price', type: 'input', label: '现价' },
        { name: 'stock', type: 'input', label: '库存' },
        { name: 'score', type: 'slot', defaultValue: 0, label: '评分' },
        { name: 'image', type: 'slot', label: '图片', required: true }
      ],
      attribute: [],
      sku: []
    }
  },
  methods: {
    beforeUpload(file) {
      const ext = ['jpg', 'png', 'gif', 'bmp']
      const size = 2
      const fileName = file.name.split('.')
      const fileExt = fileName[fileName.length - 1]
      const isTypeOk = ext.indexOf(fileExt) >= 0
      const isSizeOk = file.size / 1024 / 1024 < size
      if (!isTypeOk) { ElMessage.error(`上传图片只支持 ${ ext.join(' / ') } 格式！`) }
      if (!isSizeOk) { ElMessage.error(`上传图片大小不能超过 ${size}MB！`) }
      return isTypeOk && isSizeOk
    },
    imageUpload(res, data) {
      const imagePath = 'https://dummyimage.com/60x60/000/fff'
      data.row.image = imagePath
      ElMessage.success('图片上传成功')
      this.$refs.skuForm.validateFieldByRows(data.index ?? data.$index, 'image', () => {})
    },
    imageRemove(data) {
      data.row.image = ''
    },
    submit() {
      this.$refs.skuForm.validate(valid => {
        if (valid) { ElMessage.success('验证通过') } else { ElMessage.warning('验证失败') }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-upload-dragger) {
  width: initial;
  height: initial;
  border: 0;
  border-radius: 0;
  background-color: initial;
  overflow: auto;
}
.image-upload-container {
  .el-image {
    vertical-align: middle;
    margin: 0 5px;
    width: 30px;
    height: 30px;
  }
  .images-upload,
  > .el-button {
    display: inline-block;
    margin: 0 5px;
    vertical-align: middle;
  }
}
</style>
