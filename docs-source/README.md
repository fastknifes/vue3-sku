# vue3-sku 文档

本组件改之于 `vue-sku-form`，并在其基础上进行 Vue 3 与 Element Plus 的全面升级与能力扩展。

- 原组件文档：`https://hurui.me/vue-sku-form/guide/`
- 原组件包名：`vue-sku-form`
- 现组件包名：`vue3-sku`
- 开源地址：Gitee `https://gitee.com/fastknife/vue3-sku` · Github `https://github.com/fastknifes/vue3-sku`

组件概述：基于 `Vue 3` 与 `Element Plus` 的电商 SKU 表单配置组件，支持规格选择、表格生成、批量设置、校验、异步数据恢复，以及图片联动、字段重命名等增强功能。

## 快速上手

使用注意：本组件依赖 `Element Plus`，安装前请确保项目已正确安装并引入 Element Plus。

安装（任选其一）：

```bash
# pnpm
pnpm add vue3-sku

# 或者 yarn
yarn add vue3-sku

# 或者 npm
npm install vue3-sku
```

全局引入（推荐）：

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SkuForm from 'vue3-sku'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(SkuForm)
app.mount('#app')
```

局部引入：

```vue
<template>
  <SkuForm />
  <!-- 也可按需传入 props 与 v-model 绑定 -->
</template>

<script setup>
import SkuForm from 'vue3-sku'
</script>
```

## 快速入口
- 组件说明：`/guide/intro.html`

## 示例导航（均为可交互示例）
- 基础功能：`/examples/basic.html`
- 自定义连接符：`/examples/separator.html`
- 关闭可选属性：`/examples/can-add-attribute.html`
- 禁用配置：`/examples/disabled.html`
- 主题风格：`/examples/theme.html`
- 自定义表格：`/examples/customize.html`
- 插槽-文本：`/examples/customize-slot.html`
- 插槽-组件：`/examples/customize-slot-component.html`
- 数据还原：`/examples/recovery.html`
- 批量设置：`/examples/batch.html`
- 必填验证：`/examples/required.html`
- 自定义验证：`/examples/validate.html`
- 异步验证：`/examples/async-validate.html`
- 指定列验证：`/examples/validate-col.html`
- 异步加载：`/examples/async-recovery.html`
- 规格组图片：`/examples/image-group.html`
- SKU 行图片：`/examples/image-sku.html`
- 组表联动图片：`/examples/image-linked.html`
- 字段重命名：`/examples/field-rename.html`

## 能力扩展（相对原组件）
- 图片列与组图片：通过 `imageMode`、`imageComponent`、`resolveImageProps` 支持 SKU 行图片与规格组图片上传
- 图片联动策略：`linkedPolicy` 支持 `lastUpdated`、`specificGroup`、`priority` 策略，`propagateOnTableEdit` 支持表格编辑回写到规格组
- 自定义字段名：通过 `skuKey`、`imageColumnName`、`attributeGroupNameKey`、`attributeItemsKey`、`attributeItemNameKey`、`attributeItemImageKey` 等实现字段重命名
