<template>
    <!-- eslint-disable vue/multi-word-component-names -->
    <div>
        <SkuForm
            v-model:attribute="attribute"
            v-model:sku="sku"
            :source-attribute="sourceAttribute"
        />
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
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
    data() {
        return {
            sourceAttribute: [
                {
                    name: '颜色',
                    item: ['黑', '金', '白']
                },
                {
                    name: '内存',
                    item: ['16G', '32G']
                }
            ],
            attribute: [],
            sku: []
        }
    }
}
</script>
