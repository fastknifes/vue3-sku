<template>
       <div class="sku-container">
        <div v-if="!disabled" class="sku-check">
            <div v-if="theme == 1" class="theme-1">
                <el-card v-for="(item, index) in myAttribute" :key="index" class="item" shadow="never">
                    <template #header>
                        <div class="group-header">
                            <span>{{ item.name }}</span>
                            <el-tooltip v-if="showGroupImageSwitch" :content="groupImageSwitchTip" placement="top">
                                <el-switch v-model="item.enableImage" size="small" @change="val => onGroupImageToggle(index, val)" />
                            </el-tooltip>
                        </div>
                    </template>
                    <div v-for="(item2, index2) in item.item" :key="index2" class="group-item-row">
                        <el-checkbox v-model="item2.checked" :label="item2.name" size="small" />
                        <component v-if="imageComponent && item.enableImage" :is="imageComponent" v-model="item2.image" 
                                   v-bind="resolveImageProps ? resolveImageProps({ level: 'group', groupName: item.name, groupIndex: index, item: item2, itemIndex: index2 }) : {}"
                                   @update:modelValue="val => onGroupItemImageChange(index, index2, val)" />
                    </div>
                    <el-input v-if="item.canAddAttribute" v-model="item.addAttribute" size="small" placeholder="新增一个规格" class="add-attr" @keyup.enter="onAddAttribute(index)">
                        <template #append>
                            <el-button size="small" @click="onAddAttribute(index)">添加</el-button>
                        </template> 
                    </el-input>
                </el-card>
            </div>
            <el-table v-else :data="myAttribute" :show-header="false" class="theme-2">
                <el-table-column prop="name" width="250" :resizable="false">
                    <template #default="scope">
                        <div class="group-header">
                            <span>{{ scope.row.name }}</span>
                            <el-tooltip v-if="showGroupImageSwitch" :content="groupImageSwitchTip" placement="top">
                                <el-switch v-model="scope.row.enableImage" size="small" @change="val => onGroupImageToggle(scope.$index, val)" />
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #default="scope">
                        <div v-for="(item2, index2) in scope.row.item" :key="index2" class="group-item-row">
                            <el-checkbox v-model="item2.checked" :label="item2.name" size="small" />
                            <component v-if="imageComponent && scope.row.enableImage" :is="imageComponent" v-model="item2.image"
                                       v-bind="resolveImageProps ? resolveImageProps({ level: 'group', groupName: scope.row.name, groupIndex: scope.$index, item: item2, itemIndex: index2 }) : {}"
                                       @update:modelValue="val => onGroupItemImageChange(scope.$index, index2, val)" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="250">
                    <template #default="scope">
                        <el-input v-model="scope.row.addAttribute" size="small" placeholder="新增一个规格" class="add-attr" @keyup.enter="onAddAttribute(scope.$index)">
                            <template #append>
                                <el-button size="small" @click="onAddAttribute(scope.$index)">添加</el-button>
                            </template>
                        </el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="add-group">
                <el-input v-model="newGroupName" size="small" placeholder="新增一个规格组" @keyup.enter="onAddGroup">
                    <template #append>
                        <el-button size="small" @click="onAddGroup">添加组</el-button>
                    </template>
                </el-input>
            </div>
        </div>
        <div class="sku-list">
            <el-form ref="form" :model="form" status-icon inline-message>
                <el-table :data="form.skuData" stripe border highlight-current-row>
                    <!-- 考虑到异步加载的情况，如果 attribute 数据先加载完成，则表头会立马展示，效果不理想，故使用emitAttribute 数据，该数据为计算属性，通过 myAttribute 生成，结构与 attribute 一致 -->
                    <el-table-column v-if="emitAttribute.length > 0" type="index" width="50" align="center" :resizable="false" />
                    <el-table-column v-for="(attr, index) in emitAttribute" :key="`attribute-${index}`" :label="attr[attributeGroupNameKey]" :prop="attr[attributeGroupNameKey]" width="120" align="center" :resizable="false" sortable />
                    <el-table-column v-for="(item, index) in renderStructure" :key="`structure-${index}`" :label="item.label" :prop="item.name" align="center" :resizable="false" min-width="120px">
                        <!-- 自定义表头 -->
                        <template #header>
                            <span :class="{'required_title': item.required}">
                                {{ item.label }}
                            </span>
                            <el-tooltip v-if="item.tip" effect="dark" :content="item.tip" placement="top" />
                        </template>
                        <!-- 自定义表格内部展示 -->
                        <template #default="scope">
                            <!-- 增加是 key 是为了保证异步验证不会出现 skuData 数据变化后无法验证的 bug -->
                            <el-form-item v-if="item.type == 'input'" :key="`structure-input-${index}-${scope.row[skuKey]}`" :prop="'skuData.' + scope.$index + '.' + item.name" :rules="rules[item.name]">
                                <el-input v-model="scope.row[item.name]" :placeholder="`请输入${item.label}`" size="small" />
                            </el-form-item>
                            <el-form-item v-else-if="item.type == 'slot'" :key="`structure-input-${index}-${scope.row[skuKey]}`" :prop="'skuData.' + scope.$index + '.' + item.name" :rules="rules[item.name]">
                                <slot :name="item.name" :index="scope.$index" :row="scope.row" :column="scope.column" />
                            </el-form-item>
                            <el-form-item v-else-if="item.type == 'image' && imageComponent" :key="`structure-image-${index}-${scope.row[skuKey]}`" :prop="'skuData.' + scope.$index + '.' + imageColumnName" :rules="rules[imageColumnName]">
                                <component :is="imageComponent" v-model="scope.row[imageColumnName]" 
                                           v-bind="resolveImageProps ? resolveImageProps({ level: 'sku', index: scope.$index, row: scope.row, column: scope.column }) : {}"
                                           @update:modelValue="val => onRowImageChange(scope.$index, val)" />
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <!-- 批量设置，当 sku 数超过 2 个时出现 -->
                    <template v-if="isBatch && form.skuData.length > 2" #append>
                        <el-table :data="[{}]" :show-header="false">
                            <el-table-column :width="attribute.length * 120 + 50" align="center" :resizable="false">批量设置</el-table-column>
                            <el-table-column v-for="(item, index) in structure" :key="`batch-structure-${index}`" align="center" :resizable="false" min-width="120px">
                                <el-input v-if="item.type == 'input' && item.batch != false" v-model="batch[item.name]" :placeholder="`填写一个${item.label}`" size="small" @keyup.enter="onBatchSet(item.name)" />
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    name: 'SkuForm',
    props: {
        /**
         * 原始规格数据
         * sourceAttribute: [
         *   { name: '颜色', item: ['黑', '金', '白'] },
         *   { name: '内存', item: ['16G', '32G'] },
         *   { name: '运营商', item: ['电信', '移动', '联通'] }
         * ]
         */
        sourceAttribute: {
            type: Array,
            default: () => []
        },
        /**
         * 已使用的规格数据，用于复原数据，支持.sync修饰符
         * attribute: [
         *   { name: '颜色', item: ['黑'] },
         *   { name: '运营商', item: ['电信', '移动', '联通'] }
         * ]
         */
        attribute: {
            type: Array,
            default: () => []
        },
        /**
         * 用于复原sku数据，支持.sync修饰符
         * sku: [
         *   { sku: '黑;电信', price: 1, stock: 1 },
         *   { sku: '黑;移动', price: 2, stock: 2 },
         *   { sku: '黑;联通', price: 3, stock: 3 }
         * ]
         */
        sku: {
            type: Array,
            default: () => []
        },
        /**
         * 表格结构，注意name字段，用于输出sku数据
         */
        structure: {
            type: Array,
            default: () => [
                { name: 'price', type: 'input', label: '价格' },
                { name: 'stock', type: 'input', label: '库存' }
            ]
        },
        // sku 字段分隔符
        separator: {
            type: String,
            default: ';'
        },
        // 无规格的 sku
        emptySku: {
            type: String,
            default: ''
        },
        // 是否显示 sku 选择栏
        disabled: {
            type: Boolean,
            default: false
        },
        // 主题风格
        theme: {
            type: Number,
            default: 1
        },
        // 是否开启异步加载
        async: {
            type: Boolean,
            default: false
        },
        showGroupImageSwitch: {
            type: Boolean,
            default: false
        },
        imageMode: {
            type: String,
            default: null
        },
        linkedPolicy: {
            type: String,
            default: 'lastUpdated'
        },
        linkedPriority: {
            type: Array,
            default: () => []
        },
        linkedSpecificGroup: {
            type: String,
            default: ''
        },
        tableImageEditable: {
            type: Boolean,
            default: true
        },
        propagateOnTableEdit: {
            type: Boolean,
            default: false
        },
        imageComponent: {
            type: [Object, Function],
            default: null
        },
        resolveImageProps: {
            type: Function,
            default: null
        },
        onImageChange: {
            type: Function,
            default: null
        },
        groupImageSwitchTip: {
            type: String,
            default: '开启后可为该规格组的子项上传图片'
        },
        imageColumnName: {
            type: String,
            default: 'image'
        },
        imageColumnLabel: {
            type: String,
            default: '图片'
        },
        includeUnselectedInAttributeDetail: {
            type: Boolean,
            default: false
        },
        emitSkuImageSource: {
            type: Boolean,
            default: false
        },
        skuKey: {
            type: String,
            default: 'sku'
        },
        skuImageSourceKey: {
            type: String,
            default: 'imageSourceGroup'
        },
        attributeGroupNameKey: {
            type: String,
            default: 'name'
        },
        attributeItemsKey: {
            type: String,
            default: 'item'
        },
        attributeGroupEnableImageKey: {
            type: String,
            default: 'enableImage'
        },
        attributeItemNameKey: {
            type: String,
            default: 'name'
        },
        attributeItemImageKey: {
            type: String,
            default: 'image'
        }
    },
    data() {
        return {
            isInit: false,
            myAttribute: [],
            form: {
                skuData: []
            },
            batch: {},
            newGroupName: ''
        }
    },
    computed: {
        rules() {
            let rules = {}
            this.renderStructure.forEach(v => {
                if (v.type == 'input') {
                    rules[v.name] = []
                    if (v.required) {
                        rules[v.name].push({ required: true, message: `${v.label}不能为空`, trigger: 'blur' })
                    }
                    if (v.validate) {
                        rules[v.name].push({ validator: this.customizeValidate, trigger: 'blur' })
                    }
                } else if (v.type == 'slot') {
                    rules[v.name] = []
                    if (v.required) {
                        rules[v.name].push({ required: true, message: `${v.label}不能为空`, trigger: ['change', 'blur'] })
                    }
                    if (v.validate) {
                        rules[v.name].push({ validator: this.customizeValidate, trigger: ['change', 'blur'] })
                    }
                } else if (v.type == 'image') {
                    rules[this.imageColumnName] = []
                    if (v.required) {
                        rules[this.imageColumnName].push({ required: true, message: `${v.label}不能为空`, trigger: ['change', 'blur'] })
                    }
                }
            })
            return rules
        },
        isBatch() {
            return this.structure.some(item => {
                return item.type == 'input' && item.batch != false
            })
        },
        // 将 myAttribute 数据还原会 attribute 数据的结构，用于更新 attribute
        emitAttribute() {
            let attribute = []
            this.myAttribute.forEach(v1 => {
                const obj = {
                    [this.attributeGroupNameKey]: v1.name,
                    [this.attributeGroupEnableImageKey]: !!v1.enableImage,
                    [this.attributeItemsKey]: []
                }
                v1.item.forEach(v2 => {
                    const shouldInclude = this.includeUnselectedInAttributeDetail ? true : (v2.checked || !!v2[this.attributeItemImageKey] || !!v2.image)
                    if (shouldInclude) {
                        obj[this.attributeItemsKey].push({
                            [this.attributeItemNameKey]: v2.name,
                            [this.attributeItemImageKey]: v2.image || ''
                        })
                    }
                })
                if (obj[this.attributeItemsKey].length !== 0) {
                    attribute.push(obj)
                }
            })
            return attribute
        },
        emitAttributeDetail() {
            let attribute = []
            this.myAttribute.forEach(v1 => {
                const obj = {
                    name: v1.name,
                    enableImage: !!v1.enableImage,
                    item: []
                }
                v1.item.forEach(v2 => {
                    const shouldInclude = this.includeUnselectedInAttributeDetail ? true : (v2.checked || !!v2.image)
                    if (shouldInclude) {
                        obj.item.push({ name: v2.name, image: v2.image || '' })
                    }
                })
                if (obj.item.length !== 0) {
                    attribute.push(obj)
                }
            })
            return attribute
        },
        renderStructure() {
            const exists = this.structure.some(v => v.name === 'image')
            const arr = this.structure.slice()
            if ((this.imageMode === 'sku' || this.imageMode === 'linked') && !exists) {
                arr.push({ name: this.imageColumnName, type: 'image', label: this.imageColumnLabel })
            }
            return arr
        }
    },
    watch: {
        myAttribute: {
            handler() {
                if (!this.isInit) {
                    // 更新父组件
                    this.$emit('update:attribute', this.emitAttribute)
                }
                // 解决通过 $emit 更新后无法拿到 attribute 最新数据的问题
                    this.$nextTick(() => {
                    if (this.attribute.length !== 0) {
                        this.combinationAttribute()
                    } else {
                        this.form.skuData = []
                        const obj = {
                            [this.skuKey]: this.emptySku
                        }
                        this.renderStructure.forEach(v => {
                            if (!(v.type == 'slot' && v.skuProperty == false)) {
                                obj[v.name] = typeof v.defaultValue != 'undefined' ? v.defaultValue : ''
                            }
                        })
                        this.form.skuData.push(obj)
                    }
                    if (this.imageMode === 'linked') {
                        this.updateSkuImagesFromAttributes()
                    }
                        this.clearValidate()
                    })
                },
                deep: true
            },
            'form.skuData': {
            handler(newValue, oldValue) {
                if (!this.isInit || (newValue.length == 1 && newValue[0][this.skuKey] == this.emptySku)) {
                    // 如果有老数据，或者 sku 数据为空，则更新父级 sku 数据
                    if (oldValue.length || !this.sku.length) {
                        // 更新父组件
                        const arr = []
                        newValue.forEach(v1 => {
                            const obj = {
                                [this.skuKey]: v1[this.skuKey]
                            }
                            this.renderStructure.forEach(v2 => {
                                if (!(v2.type == 'slot' && v2.skuProperty == false)) {
                                    obj[v2.name] = v1[v2.name] || (typeof v2.defaultValue != 'undefined' ? v2.defaultValue : '')
                                }
                            })
                            if (this.emitSkuImageSource && v1[this.skuImageSourceKey]) {
                                obj[this.skuImageSourceKey] = v1[this.skuImageSourceKey]
                            }
                            arr.push(obj)
                        })
                        this.$emit('update:sku', arr)
                    }
                    if (this.imageMode === 'linked' && this.propagateOnTableEdit) {
                        if (oldValue && oldValue.length === newValue.length) {
                            for (let i = 0; i < newValue.length; i++) {
                                if (newValue[i][this.imageColumnName] !== oldValue[i][this.imageColumnName]) {
                                    this.propagateImageToAttributeForRow(i, newValue[i][this.imageColumnName])
                                    if (this.onImageChange) {
                                        this.onImageChange({ level: 'sku', scope: { index: i, row: newValue[i] }, url: newValue[i][this.imageColumnName] })
                                    }
                                }
                            }
                        }
                    }
                }
            },
            deep: true
            }
    },
    mounted() {
        !this.async && this.init()
    },
    methods: {
        init() {
            this.$nextTick(() => {
                this.isInit = true
                // 初始化 myAttribute
                let myAttribute = []
                // 根据 sourceAttribute 复原 myAttribute 的结构
                this.sourceAttribute.forEach(v => {
                    const temp = {
                        name: v.name,
                        canAddAttribute: typeof v.canAddAttribute != 'undefined' ?  v.canAddAttribute : true,
                        enableImage: typeof v.enableImage != 'undefined' ? v.enableImage : false,
                        addAttribute: '',
                        item: []
                    }
                    v.item.forEach(itemName => {
                        if (typeof itemName === 'object' && itemName) {
                            temp.item.push({
                                name: itemName.name,
                                checked: false,
                                image: itemName.image || '',
                                imageUpdatedAt: itemName.image ? Date.now() : null
                            })
                        } else {
                            temp.item.push({
                                name: itemName,
                                checked: false,
                                image: '',
                                imageUpdatedAt: null
                            })
                        }
                    })
                    myAttribute.push(temp)
                })
                // 根据 attribute 更新 myAttribute（支持自定义键名）
                this.attribute.forEach(attrVal => {
                    const groupName = attrVal[this.attributeGroupNameKey]
                    const items = attrVal[this.attributeItemsKey] || []
                    myAttribute.forEach(myAttrVal => {
                        if (groupName === myAttrVal.name) {
                            items.forEach(attrItem => {
                                const attrItemName = typeof attrItem === 'object' ? (attrItem[this.attributeItemNameKey] || attrItem.name) : attrItem
                                if (
                                    !myAttrVal.item.some(myAttrItem => {
                                        if (attrItemName === myAttrItem.name) {
                                            myAttrItem.checked = true
                                        }
                                        return attrItemName === myAttrItem.name
                                    })
                                ) {
                                    myAttrVal.item.push({
                                        name: attrItemName,
                                        checked: true
                                    })
                                }
                            })
                        }
                    })
                })
                this.myAttribute = myAttribute
                // 通过 sku 更新 skuData，但因为 skuData 是实时监听 myAttribute 变化并自动生成，而 watch 是在 methods 后执行，所以增加 setTimeout 方法，确保 skuData 生成后在执行下面的代码
                setTimeout(() => {
                    this.sku.forEach(skuItem => {
                        this.form.skuData.forEach(skuDataItem => {
                            if (skuItem[this.skuKey] === skuDataItem[this.skuKey]) {
                                this.renderStructure.forEach(structureItem => {
                                    skuDataItem[structureItem.name] = skuItem[structureItem.name]
                                })
                            }
                        })
                    })
                    this.isInit = false
                }, 0)
            })
        },
        // 根据 attribute 进行排列组合，生成 skuData 数据（支持自定义键名）
        combinationAttribute(index = 0, dataTemp = []) {
            const groups = this.attribute
            const itemKey = this.attributeItemsKey
            const nameKey = this.attributeGroupNameKey
            if (!groups || !groups.length || !groups[0] || !groups[0][itemKey]) return
            const getItemName = it => (typeof it === 'object' && it) ? (it[this.attributeItemNameKey] || it.name) : it
            if (index === 0) {
                const firstItems = groups[0][itemKey]
                const firstName = groups[0][nameKey]
                for (let i = 0; i < firstItems.length; i++) {
                    const val = getItemName(firstItems[i])
                    const obj = {
                        [this.skuKey]: val,
                        [firstName]: val
                    }
                    this.renderStructure.forEach(v => {
                        if (!(v.type == 'slot' && v.skuProperty == false)) {
                            obj[v.name] = typeof v.defaultValue != 'undefined' ? v.defaultValue : ''
                        }
                    })
                    dataTemp.push(obj)
                }
            } else {
                const temp = []
                const curItems = groups[index][itemKey]
                const curName = groups[index][nameKey]
                for (let i = 0; i < dataTemp.length; i++) {
                    for (let j = 0; j < curItems.length; j++) {
                        temp.push(JSON.parse(JSON.stringify(dataTemp[i])))
                        const val = getItemName(curItems[j])
                        temp[temp.length - 1][curName] = val
                        temp[temp.length - 1][this.skuKey] = [temp[temp.length - 1][this.skuKey], val].join(this.separator)
                    }
                }
                dataTemp = temp
            }
            if (index !== groups.length - 1) {
                this.combinationAttribute(index + 1, dataTemp)
            } else {
                if (!this.isInit || this.async) {
                    for (let i = 0; i < this.form.skuData.length; i++) {
                        for (let j = 0; j < dataTemp.length; j++) {
                            if (this.form.skuData[i][this.skuKey] === dataTemp[j][this.skuKey]) {
                                dataTemp[j] = this.form.skuData[i]
                            }
                        }
                    }
                }
                this.form.skuData = dataTemp
                if (this.imageMode === 'linked') {
                    this.updateSkuImagesFromAttributes()
                }
            }
        },
        onGroupItemImageChange(groupIndex, itemIndex, val) {
            const item = this.myAttribute[groupIndex].item[itemIndex]
            item.image = val || ''
            item.imageUpdatedAt = item.image ? Date.now() : null
            if (this.onImageChange) {
                this.onImageChange({ level: 'group', scope: { groupName: this.myAttribute[groupIndex].name, itemName: item.name }, url: item.image })
            }
            if (this.imageMode === 'linked') {
                this.updateSkuImagesFromAttributes()
            }
        },
        onGroupImageToggle(groupIndex, val) {
            if (val && !this.imageComponent) {
                ElMessage({ type: 'error', message: '请先传入上传组件后再开启图片开关' })
                this.myAttribute[groupIndex].enableImage = false
            }
        },
        onRowImageChange(index, val) {
            this.form.skuData[index][this.imageColumnName] = val || ''
            this.validateFieldByRows(index, this.imageColumnName, () => {})
            if (this.onImageChange) {
                this.onImageChange({ level: 'sku', scope: { index, row: this.form.skuData[index] }, url: this.form.skuData[index][this.imageColumnName] })
            }
            if (this.imageMode === 'linked' && this.propagateOnTableEdit) {
                this.propagateImageToAttributeForRow(index, this.form.skuData[index][this.imageColumnName])
            }
        },
        updateSkuImagesFromAttributes() {
            this.form.skuData.forEach((row, i) => {
                const res = this.getImageForRow(row)
                row[this.imageColumnName] = res.url || ''
                row[this.skuImageSourceKey] = res.source || ''
            })
        },
        getImageForRow(row) {
            if (!(this.imageMode === 'linked')) return { url: row[this.imageColumnName] || '', source: row[this.skuImageSourceKey] || '' }
            const groups = this.myAttribute
            if (this.linkedPolicy === 'specificGroup' && this.linkedSpecificGroup) {
                const g = groups.find(v => v.name === this.linkedSpecificGroup)
                if (!g) return { url: '', source: '' }
                const val = row[this.linkedSpecificGroup]
                const it = g.item.find(x => x.name === val)
                return it && it.image ? { url: it.image, source: this.linkedSpecificGroup } : { url: '', source: '' }
            }
            if (this.linkedPolicy === 'priority' && this.linkedPriority && this.linkedPriority.length) {
                for (let k = 0; k < this.linkedPriority.length; k++) {
                    const gname = this.linkedPriority[k]
                    const g = groups.find(v => v.name === gname)
                    if (!g) continue
                    const val = row[gname]
                    const it = g.item.find(x => x.name === val)
                    if (it && it.image) return { url: it.image, source: gname }
                }
                return { url: '', source: '' }
            }
            let latest = { t: -1, url: '', source: '' }
            groups.forEach(g => {
                const gname = g.name
                if (typeof row[gname] === 'undefined') return
                const val = row[gname]
                const it = g.item.find(x => x.name === val)
                if (it && it.image && it.imageUpdatedAt && it.imageUpdatedAt > latest.t) {
                    latest = { t: it.imageUpdatedAt, url: it.image, source: gname }
                }
            })
            return latest
        },
        propagateImageToAttributeForRow(index, url) {
            const row = this.form.skuData[index]
            let targetGroup = ''
            if (this.linkedPolicy === 'specificGroup' && this.linkedSpecificGroup) {
                targetGroup = this.linkedSpecificGroup
            } else if (this.linkedPolicy === 'priority' && this.linkedPriority && this.linkedPriority.length) {
                targetGroup = this.linkedPriority[0]
            } else if (this.linkedPolicy === 'lastUpdated') {
                let latest = { t: -1, group: '' }
                this.myAttribute.forEach(g => {
                    const gname = g.name
                    if (typeof row[gname] === 'undefined') return
                    const val = row[gname]
                    const it = g.item.find(x => x.name === val)
                    if (it && it.imageUpdatedAt && it.imageUpdatedAt > latest.t) {
                        latest = { t: it.imageUpdatedAt, group: gname }
                    }
                })
                targetGroup = latest.group
            }
            if (!targetGroup) return
            const g = this.myAttribute.find(v => v.name === targetGroup)
            if (!g) return
            const val = row[targetGroup]
            const it = g.item.find(x => x.name === val)
            if (!it) return
            it.image = url || ''
            it.imageUpdatedAt = it.image ? Date.now() : null
        },
        // 新增一个规格
        onAddAttribute(index) {
            this.myAttribute[index].addAttribute = this.myAttribute[index].addAttribute.trim()
            if (this.myAttribute[index].addAttribute !== '') {
                if (!this.myAttribute[index].addAttribute.includes(this.separator)) {
                    const flag = this.myAttribute[index].item.some(item => {
                        return item.name === this.myAttribute[index].addAttribute
                    })
                    if (!flag) {
                        this.myAttribute[index].item.push({
                            name: this.myAttribute[index].addAttribute,
                            checked: true
                        })
                        this.myAttribute[index].addAttribute = ''
                    } else {
                        ElMessage({ type: 'warning', message: '请勿添加相同规格' })
                    }
                } else {
                    ElMessage({ type: 'warning', message: `规格里不允许出现「 ${this.separator} 」字符，请检查后重新添加` })
                }
            }
        },
        // 新增一个规格组
        onAddGroup() {
            this.newGroupName = this.newGroupName.trim()
            if (this.newGroupName !== '') {
                if (!this.newGroupName.includes(this.separator)) {
                    const exists = this.myAttribute.some(v => v.name === this.newGroupName)
                    if (!exists) {
                        this.myAttribute.push({
                            name: this.newGroupName,
                            canAddAttribute: true,
                            addAttribute: '',
                            item: []
                        })
                        this.newGroupName = ''
                    } else {
                        ElMessage({ type: 'warning', message: '请勿添加相同规格组' })
                    }
                } else {
                    ElMessage({ type: 'warning', message: `规格组里不允许出现「 ${this.separator} 」字符，请检查后重新添加` })
                }
            }
        },
        onBatchSet(type) {
            if (this.batch[type] != '') {
                this.form.skuData.forEach(v => {
                    v[type] = this.batch[type]
                })
                this.batch[type] = ''
                // 批量设置完成后，触发一次当前列的验证
                this.validateFieldByColumns([type], () => {})
            }
        },
        // 自定义输入框验证，通过调用 structure 里的 validate 方法实现，重点是 callback 要带过去
        customizeValidate(rule, value, callback) {
            let [model, index, name] = rule.field.split('.')
            this.structure.forEach(v => {
                if (v.name == name) {
                    v.validate(this.form[model], index, callback)
                }
            })
        },
        // sku 表单验证
        validate(callback) {
            this.$refs['form'].validate(valid => {
                callback(valid)
            })
        },
        validateFieldByColumns(colums, callback) {
            let props = []
            this.form.skuData.forEach((v, i) => {
                colums.forEach(v => {
                    props.push(`skuData.${i}.${v}`)
                })
            })
            this.$refs['form'].validateField(props, valid => {
                callback(valid)
            })
        },
        validateFieldByRows(index, prop, callback) {
            this.$refs['form'].validateField([`skuData.${index}.${prop}`], valid => {
                callback(valid)
            })
        },
        clearValidate() {
            this.$refs['form'].clearValidate()
        }
    }
}
</script>

<style lang="scss" scoped>
.sku-container {
    :deep(.el-card) {
        margin: 10px 0;
        .el-card__header {
            line-height: initial;
            padding: 10px 20px;
        }
        .el-card__body {
            padding: 10px 20px 20px;
        }
    }
    .sku-check {
        .theme-1 {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 10px;
            .item {
                width: 32%;
                &:last-child:nth-child(3n - 1) {
                    margin-right: calc(100% - 32% * 2 - 4% / 2) !important;
                }
                .add-attr {
                    width: 100%;
                    margin-top: 10px;
                }
            }
        }
        .theme-2 {
            border: 1px solid #ebeef5;
            border-bottom: 0;
            margin-bottom: 20px;
        }
        .add-group {
            margin: 10px 0 20px;
            display: inline-block;
            :deep(.el-input) {
                width: 300px;
            }
        }
    }
    .sku-name {
        text-align: right;
    }
    .batch-set {
        width: 100%;
        margin-top: 5px;
    }
    .sku-list {
        line-height: initial;
        :deep(.el-input__inner) {
            text-align: center;
        }
        :deep(.el-table__append-wrapper) {
            overflow: initial;
            .el-table {
                overflow: initial;
                .el-table__body-wrapper {
                    overflow: initial;
                }
            }
        }
        :deep(.el-form-item) {
            margin-bottom: 0;
            .el-form-item__content {
                line-height: initial;
                .el-form-item__error {
                    margin-left: 0;
                }
            }
        }
        .required_title::before {
            content: '*';
            color: #f56c6c;
        }
    }
    .group-header {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .group-header :deep(.el-switch) {
        margin-left: 16px;
    }
    :deep(.el-switch__core) {
        margin-top: 3px;
    }
    .group-item-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 0;
    }
    .group-item-row :deep(.el-checkbox) {
        flex: 1;
    }
    .group-item-row :deep(.avatar-uploader),
    .group-item-row :deep(.el-upload) {
        margin-left: 12px;
    }
}
</style>
