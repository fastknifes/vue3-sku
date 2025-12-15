import { defineClientConfig } from 'vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SkuForm from '../../src/components/index'
import BasicDemo from './components/BasicDemo.vue'
import SeparatorDemo from './components/SeparatorDemo.vue'
import DisabledDemo from './components/DisabledDemo.vue'
import ThemeDemo from './components/ThemeDemo.vue'
import CustomizeDemo from './components/CustomizeDemo.vue'
import CustomizeSlotDemo from './components/CustomizeSlotDemo.vue'
import CustomizeSlotComponentDemo from './components/CustomizeSlotComponentDemo.vue'
import RequiredDemo from './components/RequiredDemo.vue'
import ValidateDemo from './components/ValidateDemo.vue'
import ValidateColDemo from './components/ValidateColDemo.vue'
import BatchDemo from './components/BatchDemo.vue'
import RecoveryDemo from './components/RecoveryDemo.vue'
import AsyncValidateDemo from './components/AsyncValidateDemo.vue'
import AsyncRecoveryDemo from './components/AsyncRecoveryDemo.vue'
import CanAddAttributeDemo from './components/CanAddAttributeDemo.vue'
import DemoUploader from './components/DemoUploader.vue'
import ImageGroupDemo from './components/ImageGroupDemo.vue'
import ImageSkuDemo from './components/ImageSkuDemo.vue'
import ImageLinkedDemo from './components/ImageLinkedDemo.vue'
import FieldRenameDemo from './components/FieldRenameDemo.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.use(ElementPlus)
    app.use(SkuForm)
    app.component('BasicDemo', BasicDemo)
    app.component('SeparatorDemo', SeparatorDemo)
    app.component('DisabledDemo', DisabledDemo)
    app.component('ThemeDemo', ThemeDemo)
    app.component('CustomizeDemo', CustomizeDemo)
    app.component('CustomizeSlotDemo', CustomizeSlotDemo)
    app.component('CustomizeSlotComponentDemo', CustomizeSlotComponentDemo)
    app.component('RequiredDemo', RequiredDemo)
    app.component('ValidateDemo', ValidateDemo)
    app.component('ValidateColDemo', ValidateColDemo)
    app.component('BatchDemo', BatchDemo)
    app.component('RecoveryDemo', RecoveryDemo)
    app.component('AsyncValidateDemo', AsyncValidateDemo)
    app.component('AsyncRecoveryDemo', AsyncRecoveryDemo)
    app.component('CanAddAttributeDemo', CanAddAttributeDemo)
    app.component('DemoUploader', DemoUploader)
    app.component('ImageGroupDemo', ImageGroupDemo)
    app.component('ImageSkuDemo', ImageSkuDemo)
    app.component('ImageLinkedDemo', ImageLinkedDemo)
    app.component('FieldRenameDemo', FieldRenameDemo)
  }
})
