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

const rule = require('../../../lib/rules/self-closing-tag')
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

ruleTester.run('self-closing-tag', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><task-detail/></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><task-detail id="123"/></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><task-detail></task-detail></template>',
      output1:'<template><task-detail/></template>',
      errors: ['When there are no subcomponents, please use self-closing tag']
    },
    {
      filename: 'test.vue',
      code: '<template><task-detail id="123"></task-detail></template>',
      output1:'<template><task-detail id="123"/></template>',
      errors: ['When there are no subcomponents, please use self-closing tag']
    }
  ],
})