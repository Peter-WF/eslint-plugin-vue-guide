# 让组件属性顺序以一个更流行的排列方式 (sort-keys)

这个规则主要适用于校验并优化组件代码风格

## :book: Rule Details

当组件属性顺序与推荐顺序不一致时，会以 report 形式报错

:-1: `不推荐` 的代码风格如下:

```js
export default {
  data() {
    return {}
  },
  name: 'my-template',
  watch: {
    items(newVal, oldVal) {
      if (oldVal !== newVal) {
      }
    }
  },
  computed: {
    ...mapGetters({
      'task': 'getTask'
    })
  },
  methods: {
    ...mapActions([
      'updateTaskAction'
    ])
  },
  created() {},
  props: {
    // basic type check (`null` means accept any type)
    propA: Number,
    // multiple possible types
    propB: [String, Number],
    // a required string
    propC: {
      type: String,
      required: true
    },
    // a number with default value
    propD: {
      type: Number,
      default: 100
    },
    // object/array defaults should be returned from a
    // factory function
    propE: {
      type: Object,
      default() {
        return { message: 'hello' }
      }
    },
    // custom validator function
    propF: {
      validator(value) {
        return value > 10
      }
    }
  },
  destroyed() {},
  components: {
    RangeSlider
  },
  mounted() {}
}
```

:+1: `推荐`的代码风格如下:

```js
export default {
  name: 'my-template',
  props: {
    // basic type check (`null` means accept any type)
    propA: Number,
    // multiple possible types
    propB: [String, Number],
    // a required string
    propC: {
      type: String,
      required: true
    },
    // a number with default value
    propD: {
      type: Number,
      default: 100
    },
    // object/array defaults should be returned from a
    // factory function
    propE: {
      type: Object,
      default() {
        return { message: 'hello' }
      }
    },
    // custom validator function
    propF: {
      validator(value) {
        return value > 10
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      'task': 'getTask'
    })
  },
  watch: {
    items(newVal, oldVal) {
      if (oldVal !== newVal) {
      }
    }
  },
  methods: {
    ...mapActions([
      'updateTaskAction'
    ])
  },
  created() {},
  mounted() {},
  destroyed() {},
  components: {
    RangeSlider
  }
}
```

## :wrench: Options

### 'sortBy': 

- **必选：** `否`
- **说明：** `属性排序顺序`	
- **类型：** `String`
- **默认值：** `name props data computed watch methods filter created mounted updated destroyed components`

