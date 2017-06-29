/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-06-26 17:33
 * @description
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const path = require('path')
let lock = 0
// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Creates AST event handlers for sort-key.
 *
 * @param {RuleContext} context - The rule context.
 * @returns {object} AST event handlers.
 */
function create (context) {
  const sourceCode = context.getSourceCode()
  const ext = path.extname(context.eslint.getFilename())
  return {
    Program (program) {
      console.log('wf：' + lock)
      if (lock || ext !== '.vue') {
        return;
      }
      debugger
      const node = program.templateBody
      if (node == null) {
        return
      }
    }
  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  create,
  meta: {
    docs: {
      description: 'should not have more than three attributes in a lint<template>',
      category: 'Stylistic Issues',
      recommended: false
    },
    schema: [
    ]
  }
}
