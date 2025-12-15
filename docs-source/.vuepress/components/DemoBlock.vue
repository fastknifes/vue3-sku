<template>
  <div class="demo-block">
    <div class="demo-content">
      <slot />
    </div>
    <div v-show="show" class="demo-code">
      <pre><code>{{ code }}</code></pre>
    </div>
    <div class="demo-toolbar-bottom">
      <el-button size="small" type="primary" plain @click="copy">复制代码</el-button>
      <el-button size="small" @click="toggle">{{ show ? '隐藏代码' : '查看代码' }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',
  props: { code: { type: String, default: '' } },
  data() { return { show: false } },
  methods: {
    toggle() { this.show = !this.show },
    copy() {
      const text = this.code || ''
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => { this.$message && this.$message.success('复制成功') })
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        this.$message && this.$message.success('复制成功')
      }
    }
  }
}
</script>

<style scoped>
.demo-code pre {
  background: #000;
  color: #f8f8f2;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 4px;
  overflow: auto;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
}
.demo-code code {
  color: inherit;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
}
.demo-toolbar-bottom { margin-top: 10px; display: flex; gap: 8px; justify-content: flex-end; }
</style>
