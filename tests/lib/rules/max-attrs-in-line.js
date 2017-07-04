/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-07-04 19:32
 * @description
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/max-attrs-in-line')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module'
  }
})

ruleTester.run('max-attrs-in-line', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
      <template>
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
      </template>
      `
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
      <template>
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
      </template>
      `,
      errors: [
        'If the property is not less than 3 should be a newline',
        'If the property is not less than 3 should be a newline',
        'If the property is not less than 3 should be a newline'
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        // bad
        <task-detail 
          id="123" 
          name="defcc"
        >
          <div>123</div>
        </task-detail>
      </template>
      `,
      errors: [
        'If the property is less than 3 should not be a newline'
      ]
    }
  ],
})
