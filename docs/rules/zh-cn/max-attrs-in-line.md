# 当模板标签属性绑定小于 ${counts} 个的属性绑定, 写在一行。超过  ${counts}  个属性的, 新起一行书写 (max-attrs-in-line)

这个规则主要适用于校验模板中代码风格

## :book: Rule Details

当标签属性大于等于配置项 counts 时，会计算当前标签总行数是否等于属性所占总行数 + 2，如果不等于则抛出错误

:-1: `不推荐` 的代码风格如下:

```html
// bad
<task-detail id="123" class="congratulation-dialog-bg" name="defcc">
  <div>123</div>
</task-detail>
     
// bad
<task-detail 
  id="123" 
  class="congratulation-dialog-bg" 
  name="defcc"></task-detail>
     
// bad
<task-detail 
  id="123" 
  class="congratulation-dialog-bg" 
  name="defcc">
  <div>123</div>
</task-detail>
```

:+1: `推荐`的代码风格如下:

```html
// good
<task-detail id="123" class="congratulation-dialog-bg">
  <div>123</div>
</task-detail>
 
// good
<task-detail>
  <div>123</div>
</task-detail>

// good
<task-detail
  class="congratulation-dialog-bg"
  id="123"
  name="defcc"
>
  <div>123</div>
</task-detail> 
```

## :wrench: Options

### counts

- **必选：** `否`
- **说明：** `单行最多属性`	
- **类型：** `Number`
- **默认值：** `3`

## TODO: `fixable`

暂时不支持 --fix
