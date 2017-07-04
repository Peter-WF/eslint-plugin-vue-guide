# 组件调用子组件时，子组件 slot 区域为空时，采用自闭合标签(self-closing-tag)

这个规则主要适用于校验模板中代码风格

## :book: Rule Details

当检查到非原生 html 标签时，会检查标签内容区是否为空（VText），若不为空且没有采用自闭和标签，则以 `report` 形式报出警告

:-1: `不推荐` 的代码风格如下:

```html
// bad
<task-detail></task-detail>
 
// bad 
<task-detail id="123"></task-detail>
```

:+1: `推荐`的代码风格如下:

```html
// good
<task-detail/>
 
// good
<task-detail id="123"/>
```

## :wrench: Options

### exclude

- **必选：** `否`
- **说明：** `通过设置该属性来排除某些特殊标签的校验`	
- **类型：** `Array`
- **默认值：** `[]`

