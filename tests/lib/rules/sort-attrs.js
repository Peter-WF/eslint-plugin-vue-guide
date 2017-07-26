/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-07-04 19:33
 * @description
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/sort-attrs')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2015
  }
})

ruleTester.run('sort-attrs', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
        <template>
          <range-slider 
            v-if="!disabled"
            v-model="task"
            max="100"
            min="0"
            step="5"
            class="my-template-range-slider"
            :class="{'is-loading': task.length}"
            :values="[10, 20]"
            @change="update"
          />
        </template>
      `
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
        <template>
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
        </template>
      `,
      errors: ['Expected attribute of the element keys should be sorted in <template>']
    }
  ],
})