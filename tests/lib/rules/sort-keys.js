/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-07-03 20:32
 * @description   将 .vue 组件属性按一定顺序排序
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/sort-keys')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module'
  }
})

ruleTester.run('sort-keys', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
        export default {
          name: 'my-template',
          props: {
            // basic type check ("null" means accept any type)
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
          computed: {},
          watch: {
            items(newVal, oldVal) {
              if (oldVal !== newVal) {
              }
            }
          },
          methods: {},
          created() {},
          mounted() {},
          destroyed() {},
          components: {
            RangeSlider
          }
        }
      `
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
        export default {
          data() {
            return {}
          },
          created() {},
          name: 'my-template',
          watch: {
            items(newVal, oldVal) {
              if (oldVal !== newVal) {
              }
            }
          },
          methods: {},
          computed: {},
          props: {
            // basic type check ("null" means accept any type)
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
      `,
      output1: `
        export default {
          name: 'my-template',
          props: {
            // basic type check ("null" means accept any type)
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
          computed: {},
          watch: {
            items(newVal, oldVal) {
              if (oldVal !== newVal) {
              }
            }
          },
          methods: {},
          created() {},
          mounted() {},
          destroyed() {},
          components: {
            RangeSlider
          }
        }
      `,
      errors: ['Expected a vue component Object should be sorted by the given list.']
    }
  ],
})
