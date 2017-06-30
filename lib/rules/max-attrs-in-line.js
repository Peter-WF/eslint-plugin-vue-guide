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
const utils = require('../utils')
let lock = 0
// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Creates AST event handlers for max-attrs-in-line.
 *
 * @param {RuleContext} context - The rule context.
 * @returns {object} AST event handlers.
 */
function create (context) {
  const names = new Set()
  const option = context.options[0] || {};
  const counts = option.counts || 3

  utils.registerTemplateBodyVisitor(context, {
    "VElement" (node) {
      if (node.parent.type !== 'VElement') {
        return
      }
      const attributes = node.startTag.attributes
      if (attributes.length >= counts) {
        const totalLine = attributes.reduce((totalLine, item) => {
          return totalLine + (item.loc.end.line - item.loc.start.line + 1)
        }, 0)

        if (node.startTag.loc.end.line - node.startTag.loc.start.line !== totalLine + 1) {
          // 属性超过 ${counts} 个则需要换行
          context.report({
            node,
            loc: node.loc,
            message: `If the property is not less than ${counts} should be a newline`
          })
        }
      } else {
        if (node.startTag.loc.start.line !== node.startTag.loc.end.line) {
          context.report({
            node,
            loc: node.loc,
            message: `If the property is less than ${counts} should not be a newline`
          })
        }
      }
    }
  })

  return {}
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  create,
  meta: {
    docs: {
      description: 'should not have more than three attributes in a line<template>',
      category: 'Stylistic Issues',
      recommended: true
    },
    schema: [
      {
        type: "object",
        properties: {
          counts: { type: 'number' }
        },
        additionalProperties: false
      }
    ]
  }
}
