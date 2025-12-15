---
lang: zh-CN
---

# 组件说明

## Props

| 参数                                  | 说明                             | 类型    | 默认值                                                                                             |
| :------------------------------------ | :------------------------------- | :------ | :------------------------------------------------------------------------------------------------- |
| [source-attribute](#source-attribute) | SKU可选属性                      | array   | []                                                                                                 |
| [structure](#structure)               | 表单结构                         | array   | [{ name: 'price', type: 'input', label: '价格' }, { name: 'stock', type: 'input', label: '库存' }] |
| [attribute](#attribute)               | SKU已选属性，支持 `.sync` 修饰符 | array   | []                                                                                                 |
| sku                                   | SKU数据，支持 `.sync` 修饰符     | array   | []                                                                                                 |
| separator                             | SKU字段分隔符                    | string  | ;                                                                                                  |
| emptySku                              | 无属性SKU名称                    | string  |                                                                                                    |
| disabled                              | 是否显示SKU选择栏                | boolean | false                                                                                              |
| theme                                 | SKU选择栏主题风格，可选1或2      | int     | 1                                                                                                  |
| async                                 | 是否开启异步加载                 | boolean | false                                                                                              |
| image-mode                            | 图片模式：关闭/SKU/联动          | string  | ''（关闭）                                                                                         |
| image-component                       | 自定义图片上传组件               | component|                                                                                                    |
| resolve-image-props                   | 上传组件上下文解析函数           | function | (scope) => ({})                                                                                    |
| on-image-change                       | 图片变更回调                     | function |                                                                                                    |
| show-group-image-switch               | 显示规格组图片开关               | boolean | false                                                                                              |
| linked-policy                         | 联动策略（联动模式下生效）       | string  | lastUpdated                                                                                        |
| propagate-on-table-edit               | 表格编辑是否回写到规格组         | boolean | false                                                                                              |
| emit-sku-image-source                 | 是否在 SKU 数据中输出图片来源组  | boolean | false                                                                                              |
| sku-key                               | 自定义 SKU 字段名                | string  | 'sku'                                                                                              |
| image-column-name                     | 自定义 图片列字段名              | string  | 'image'                                                                                            |
| image-column-label                    | 自定义 图片列表头名称            | string  | '图片'                                                                                            |
| attribute-group-name-key              | 自定义 规格组名字段名            | string  | 'name'                                                                                             |
| attribute-items-key                   | 自定义 规格组子项数组字段名      | string  | 'item'                                                                                             |
| attribute-group-enable-image-key      | 自定义 规格组启用图片字段名      | string  | 'enableImage'                                                                                      |
| attribute-item-name-key               | 自定义 规格子项名字段名          | string  | 'name'                                                                                             |
| attribute-item-image-key              | 自定义 规格子项图片字段名        | string  | 'image'                                                                                            |

### source-attribute

| 名称            | 说明             | 类型    | 默认值 |
| :-------------- | :--------------- | :------ | :----- |
| name            | 属性名称         | string  |        |
| item            | 属性可选项       | array   |        |
| canAddAttribute | 是否可以添加属性 | boolean | true   |


```js
// 例子
[
	{ name: '颜色', item: ['黑', '金', '白'] },
	{ name: '内存', item: ['16G', '32G'], canAddAttribute: false },
	{ name: '运营商', item: ['电信', '移动', '联通'] }
]
```

### structure

| 名称         | 说明                                                            | 类型     | 默认值 | 可选值      |
| :----------- | :-------------------------------------------------------------- | :------- | :----- | :---------- |
| name         | SKU数据里的属性                                                 | string   |        |             |
| type         | 表单展示形式，默认为输入框，当设置为 slot 时，为自定义插槽      | string   | input  | input, slot |
| skuProperty  | 当 type 设置为 slot 时，可选择是否插槽数据是否记录到 sku 数据里 | boolean  | true   |             |
| defaultValue | 默认值                                                          | any      |        |             |
| label        | 表头名称                                                        | string   |        |             |
| tip          | 鼠标悬停提示                                                    | string   |        |             |
| batch        | 是否开启批量设置                                                | boolean  | true   |             |
| required     | 是否必填                                                        | boolean  | false  |             |
| validate     | 自定义校验回调方法                                              | function | false  |             |

```js
// 例子
[
	{
		name: 'code',
		type: 'input',
		label: '商品唯一编码',
		required: true,
		batch: false
	},
	{
		name: 'originalprice',
		type: 'input',
		label: '成本价'
	},
	{
		name: 'price',
		type: 'input',
		label: '销售价'
	},
	{
		name: 'stock',
		type: 'input',
		defaultValue: 10,
		label: '库存',
		tip: '库存数不能少于10',
		validate: (data, index, callback) => {
			if (parseInt(data[index].stock) < 10) {
				callback(new Error('库存不能小于10'))
			}
			callback()
		}
	}
]
```

### attribute

| 名称 | 说明       | 类型   | 可选值 |
| :--- | :--------- | :----- | :----- |
| name | 属性名称   | string |        |
| item | 属性已选项 | array  |        |


```js
// 例子
[
	{ name: '颜色', item: ['黑', '红'] },
	{ name: '运营商', item: ['电信'] }
]
// 需要注意 attribute 的属性名称需要 source-attribute 里存在，但 attribute 的属性已选项则没有限制
// 例如下面的例子则是错误示范
[
	{ name: '尺码', item: ['L', 'M'] },
	{ name: '运营商', item: ['电信'] }
]
```

## Methods

| 方法名        | 说明                                                                                      |
| :------------ | :---------------------------------------------------------------------------------------- |
| init          | 初始化方法，如果数据是异步载入，需要在获取到数据后手动进行SKU表单的初始化                 |
| validate      | SKU表单验证方法，参数为一个回调函数                                                       |
| validateField | SKU表单验证指定列方法，第一个参数为列名（structure 里的属性名），第二个参数为一个回调函数 |
| clearValidate | 清除SKU表单验证结果                                                                       |

### 进阶方法

| 方法名                     | 说明                                                                                           |
| :------------------------- | :--------------------------------------------------------------------------------------------- |
| validateFieldByColumns     | 按列名数组批量校验，如 `['price','stock']`                                                     |
| validateFieldByRows        | 按行索引与列名校验，如 `(rowIndex, 'image', callback)`                                         |

## v-model 与数据格式

- `v-model:attribute`：规格选择的输出，示例：

```json
[
  { "name": "颜色", "item": ["黑", "金"] },
  { "name": "内存", "item": ["16G"] }
]
```

- `v-model:sku`：表格数据的输出，示例（默认字段名）：

```json
[
  { "sku": "黑;16G", "price": 85, "stock": 100 },
  { "sku": "金;16G", "price": 85, "stock": 50 }
]
```

当启用图片列（`image-mode="sku"`）时，输出包含图片字段：

```json
[
  { "sku": "黑;16G", "price": 85, "stock": 100, "image": "https://.../a.png" }
]
```

当配置字段重命名（如 `sku-key="sku_code"`、`image-column-name="img"`）时，输出字段按自定义名变更。

## 图片能力

- 行图片：设置 `image-mode="sku"`，组件自动在表格右侧追加图片列；通过 `image-component` 注入上传控件；`on-image-change` 可监听变更。
- 组图片：开启 `show-group-image-switch` 允许为规格组子项上传图片，用于联动或展示。
- 联动策略：设置 `image-mode="linked"` 并选择 `linked-policy`：
  - `lastUpdated`：最近更新的组图片优先
  - `specificGroup`：指定组名优先（结合业务扩展）
  - `priority`：按优先级列表匹配
- 回写与来源：`propagate-on-table-edit` 允许表格编辑图片回写到规格组；`emit-sku-image-source` 在 `sku` 数据中输出图片来源组名。

上传组件参数通过 `resolve-image-props(scope)` 传入，scope 包含上下文（如组名、层级、行数据等）。

## 字段重命名

为对接后端契约，可通过以下 Props 重命名输入输出字段：

| 配置项                          | 作用                     | 默认值       |
| :------------------------------ | :----------------------- | :----------- |
| sku-key                         | SKU 字段名               | 'sku'        |
| image-column-name               | 图片列字段名             | 'image'      |
| image-column-label              | 图片列表头名称           | '图片'       |
| attribute-group-name-key        | 规格组名字段名           | 'name'       |
| attribute-items-key             | 规格组子项数组字段名     | 'item'       |
| attribute-group-enable-image-key| 规格组启用图片字段名     | 'enableImage'|
| attribute-item-name-key         | 规格子项名字段名         | 'name'       |
| attribute-item-image-key        | 规格子项图片字段名       | 'image'      |

## 插槽

- 在 `structure` 中将列 `type: 'slot'`，即可通过具名插槽自定义渲染。
- 若 `skuProperty: false`，该列仅用于展示，不写入 `sku` 输出。

示例：

```html
<SkuForm :structure="[{ name: 'totalPrice', type: 'slot', skuProperty: false }]">
  <template #totalPrice="{ row }">{{ (row.price * row.stock).toFixed(2) }} 元</template>
</SkuForm>
```

## 异步加载

- 设置 `async` 开启异步模式；当分步加载 `source-attribute`、`attribute`、`sku` 完毕后，调用 `init()` 统一初始化。
- 适合页面分步拉取数据或切换不同数据源的场景。

## 校验

- 必填：在列上设置 `required: true`
- 自定义：`validate(data, index, callback)` 中执行校验逻辑（支持异步）
- 指定列：`validateFieldByColumns(['price','stock'])`
- 行校验：`validateFieldByRows(rowIndex, 'image', callback)`

## 快速示例

```html
<SkuForm
  :source-attribute="sourceAttribute"
  :structure="structure"
  v-model:attribute="attribute"
  v-model:sku="sku"
  image-mode="sku"
  :image-component="Uploader"
  :resolve-image-props="(scope) => ({ row: scope.row?.sku })"
/>
```

更多示例请查看左侧“示例”导航，所有页面均可交互并附带源码。 
