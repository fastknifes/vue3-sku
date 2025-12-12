# vue-sku-form

基于 Vue & ElementUI 的电商 SKU 表单配置组件

[文档](https://hooray.github.io/vue-sku-form)

## 使用（npm 包）

- 安装：`npm i vue element-plus vue-sku-form`
- 引入：
  - `import { createApp } from 'vue'`
  - `import SkuForm from 'vue-sku-form'`
  - `import 'element-plus/dist/index.css'`
  - `createApp(App).use(SkuForm).mount('#app')`

说明：`vue` 与 `element-plus` 作为 peerDependencies 由宿主应用提供，库构建不内联它们，包体更小、版本更可控。

## 演示（UMD 单文件）

- 构建：`pnpm run build-standalone`
- 预览：打开 `dist-standalone/demo.html`
- 特点：内联 `Vue`，无需外部 JS；样式通过引入 `element-plus` 的 CSS 链接以保证观感。


