# 让模版中属性的排版顺序以一个更流行的排列方式 (sort-attrs)

这个规则主要适用于校验模板中代码风格

## :book: Rule Details

### 属性的推荐书写顺序 

+ `渲染指令`：一般而言，我们会更关注组件中条件渲染指令，因此 `v-if`、`v-show` 之类的指令应该放在最前面。

+ `双向绑定指令`：`v-model` 指令在表单控件元素上创建双向数据绑定，这种比 `动态属性` 拥有更强大的功能，排在前面可以让人提前注意该属性。

+ `静态属性`：一般情况下 `静态属性` 会是调用组件时传入的一个 `确定的` 类型值，该值用于区分相同组件在不同情况下的展示形式。

+ `动态属性`：`动态属性` 用于父组件与子组件进行通信，关注优先级仅次于 `静态属性`。

+ `事件处理器`：此类属性一般是用于 `父组件` 将数据传入 `子组件` 后，通过设置 `事件处理器` 接收子组件返回值。

### **注意**：

若标签类型一致，则按照字符串大小做排序。例如：`'abc' > 'ab'` , `'ad' < 'ba'`
    
:-1: `不推荐` 的代码风格如下:

```html
// bad
<range-slider 
  min="0"
  v-if="!disabled"
  @change="update"
  v-model="task"
  class="my-template-range-slider"
  step="5"
  max="100"
  :values="[10, 20]"
  :class="{'is-loading': task.length}"
/>
```

:+1: `推荐`的代码风格如下:

```html
// good
<range-slider 
  v-if="!disabled"
  v-model="task"
  class="my-template-range-slider"
  max="100"
  min="0"
  step="5"
  :values="[10, 20]"
  :class="{'is-loading': task.length}"
  @change="update"
/>
```

## :wrench: Options

> 权重选项。权重越大，排序越靠前

### conditional

- **必选：** `否`
- **说明：** `渲染指令权重`	
- **类型：** `Number`
- **默认值：** `10000`

### directives

- **必选：** `否`
- **说明：** `一般指令权重`	
- **类型：** `Number`
- **默认值：** `1000`

### literal-props

- **必选：** `否`
- **说明：** `静态属性权重`	
- **类型：** `Number`
- **默认值：** `100`

### dynamic-props

- **必选：** `否`
- **说明：** `动态属性权重`	
- **类型：** `Number`
- **默认值：** `10`

### events

- **必选：** `否`
- **说明：** `事件属性权重`	
- **类型：** `Number`
- **默认值：** `1`

## TODO: `fixable`

暂时不支持 --fix
