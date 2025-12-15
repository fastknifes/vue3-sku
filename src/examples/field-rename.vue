<template>
    <div>
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
                <pre><code>{{ attribute }}</code></pre>
            </el-col>
            <el-col>
                <el-divider content-position="left">sku 数据（自定义键）</el-divider>
                <pre><code>{{ sku }}</code></pre>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { markRaw } from 'vue'
import MyUploader from '@/components/MyUploader.vue'
export default {
    data() {
        return {
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
            imageComponent: markRaw(MyUploader)
        }
    }
}
</script>

