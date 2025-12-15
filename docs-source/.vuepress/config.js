import themePkg from '@vuepress/theme-default'
import bundlerPkg from '@vuepress/bundler-vite'
import mzPkg from '@vuepress/plugin-medium-zoom'
const defaultTheme = themePkg.default || themePkg.defaultTheme || themePkg
const viteBundler = bundlerPkg.default || bundlerPkg.viteBundler || bundlerPkg
const mediumZoomPlugin = mzPkg.default || mzPkg.mediumZoomPlugin || mzPkg

export default {
    title: 'vue3-sku',
    description: '基于 Vue3 & Element Plus 的电商 SKU 表单配置组件',
    base: '/vue3-sku/',
    dest: '../docs',
    bundler: viteBundler(),
    theme: defaultTheme({
        sidebarDepth: 0,
        navbar: [
            { text: '指南', link: '/' },
            {
                text: '示例',
                children: [
                    { text: '基础功能', link: '/examples/basic.html' },
                    { text: '自定义连接符', link: '/examples/separator.html' },
                    { text: '关闭可选属性', link: '/examples/can-add-attribute.html' },
                    { text: '禁用SKU配置', link: '/examples/disabled.html' },
                    { text: '主题风格', link: '/examples/theme.html' },
                    { text: '自定义表格', link: '/examples/customize.html' },
                    { text: '插槽-文本', link: '/examples/customize-slot.html' },
                    { text: '插槽-组件', link: '/examples/customize-slot-component.html' },
                    { text: '数据还原', link: '/examples/recovery.html' },
                    { text: '批量设置', link: '/examples/batch.html' },
                    { text: '必填验证', link: '/examples/required.html' },
                    { text: '自定义验证', link: '/examples/validate.html' },
                    { text: '异步验证', link: '/examples/async-validate.html' },
                    { text: '指定列验证', link: '/examples/validate-col.html' },
                    { text: '异步加载', link: '/examples/async-recovery.html' },
                    { text: '规格组图片', link: '/examples/image-group.html' },
                    { text: 'SKU行图片', link: '/examples/image-sku.html' },
                    { text: '组表联动图片', link: '/examples/image-linked.html' },
                    { text: '字段重命名', link: '/examples/field-rename.html' }
                ]
            },
            { text: 'Github', link: 'https://github.com/fastknifes/vue3-sku' },
            { text: 'Gitee', link: 'https://gitee.com/fastknife/vue3-sku' }
        ],
        sidebar: [
            { text: '指南', link: '/', children: [] },
            { text: '组件说明', link: '/guide/intro.html', children: [] },
            { text: '基础功能', link: '/examples/basic.html', children: [] },
            { text: '自定义连接符', link: '/examples/separator.html', children: [] },
            { text: '关闭可选属性', link: '/examples/can-add-attribute.html', children: [] },
            { text: '禁用SKU配置', link: '/examples/disabled.html', children: [] },
            { text: '主题风格', link: '/examples/theme.html', children: [] },
            { text: '自定义表格', link: '/examples/customize.html', children: [] },
            { text: '插槽-文本', link: '/examples/customize-slot.html', children: [] },
            { text: '插槽-组件', link: '/examples/customize-slot-component.html', children: [] },
            { text: '数据还原', link: '/examples/recovery.html', children: [] },
            { text: '批量设置', link: '/examples/batch.html', children: [] },
            { text: '必填验证', link: '/examples/required.html', children: [] },
            { text: '自定义验证', link: '/examples/validate.html', children: [] },
            { text: '异步验证', link: '/examples/async-validate.html', children: [] },
            { text: '指定列验证', link: '/examples/validate-col.html', children: [] },
            { text: '异步加载', link: '/examples/async-recovery.html', children: [] },
            { text: '规格组图片', link: '/examples/image-group.html', children: [] },
            { text: 'SKU行图片', link: '/examples/image-sku.html', children: [] },
            { text: '组表联动图片', link: '/examples/image-linked.html', children: [] },
            { text: '字段重命名', link: '/examples/field-rename.html', children: [] }
        ]
    })
}
