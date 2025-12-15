<template>
  <div class="image-upload-container">
    <el-image v-if="modelValue" :src="modelValue" :preview-src-list="[modelValue]" fit="cover" />
    <el-upload :show-file-list="false" :auto-upload="false" action="#" :before-upload="beforeUpload" :on-change="handleChange" class="images-upload">
      <el-button size="small">{{ modelValue ? '重新上传' : '上传图片' }}</el-button>
    </el-upload>
    <el-button v-if="modelValue" size="small" @click="remove" />
  </div>
  </template>

<script>
export default {
  name: 'DemoUploader',
  props: { modelValue: { type: String, default: '' } },
  emits: ['update:modelValue'],
  methods: {
    beforeUpload(file) {
      const ext = ['jpg', 'png', 'gif', 'bmp']
      const size = 2
      const fileName = file.name.split('.')
      const fileExt = fileName[fileName.length - 1]
      const isTypeOk = ext.indexOf(fileExt) >= 0
      const isSizeOk = file.size / 1024 / 1024 < size
      if (!isTypeOk) { this.$message && this.$message.error(`上传图片只支持 ${ ext.join(' / ') } 格式！`) }
      if (!isSizeOk) { this.$message && this.$message.error(`上传图片大小不能超过 ${size}MB！`) }
      return isTypeOk && isSizeOk
    },
    handleChange(file) {
      const raw = file && (file.raw || file)
      if (!raw) return
      const reader = new FileReader()
      reader.onload = () => {
        this.$emit('update:modelValue', reader.result || '')
        this.$message && this.$message.success('图片上传成功')
      }
      reader.readAsDataURL(raw)
    },
    remove() {
      this.$emit('update:modelValue', '')
    }
  }
}
</script>

<style scoped>
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
