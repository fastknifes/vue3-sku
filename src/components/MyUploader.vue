<template>
    <div class="avatar-uploader">
        <el-upload :auto-upload="false" :show-file-list="false" accept="image/*" :on-change="onChange">
            <el-button size="small">选择图片</el-button>
        </el-upload>
        <el-image v-if="modelValue" :src="modelValue" style="width: 30px; height: 30px; margin-left: 8px;" />
        <el-button v-if="modelValue" size="small" type="danger" style="margin-left: 8px;" @click="clear">清除</el-button>
    </div>
</template>

<script>
export default {
    name: 'MyUploader',
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue'],
    methods: {
        onChange(file) {
            const url = URL.createObjectURL(file.raw)
            this.$emit('update:modelValue', url)
        },
        clear() {
            this.$emit('update:modelValue', '')
        }
    }
}
</script>

<style scoped>
.avatar-uploader {
    display: flex;
    align-items: center;
}
</style>

