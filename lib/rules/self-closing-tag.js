/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-06-26 17:33
 * @description   自闭合标签规则: 没有子组件时，采用自闭合标签
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const path = require('path')
const utils = require('../utils')

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Creates AST event handlers for self-closing-tag.
 *
 * @param {RuleContext} context - The rule context.
 * @returns {object} AST event handlers.
 */
function create (context) {
  const sourceCode = context.getSourceCode()
  const option = context.options[0] || {};
  const exclude = [].concat(option.exclude)

  utils.registerTemplateBodyVisitor(context, {
    "VElement" (node) {
      if (node.parent.type !== 'VElement') {
        return
      }
      if (exclude.indexOf(node.startTag.id.name) > -1) {
        return
      }
      // 如果子元素为空且不是自闭合标签则报警
      if (isEmpty(node) && !node.startTag.selfClosing) {
        context.report({
          node,
          loc: node.loc,
          message: `When there are no subcomponents, please use self-closing tag`,
          fix (fixer) {
            // Expand the replacement range to include the surrounding
            // tokens to avoid conflicting with no-extra-semi.
            // https://github.com/eslint/eslint/issues/7928
            return fixer.replaceTextRange([
              node.startTag.range[1] - 1,
              node.endTag.range[1]
            ], '/>');
          }
        })
      }
    }
  })
  return {}
}
/**
 * 判断当前节点子元素集是否为空
 * @param node
 * @returns {*}
 */
function isEmpty (node) {
  // 如果子节点长度为空
  if (!node.children.length) {
    return true
  }

  // 或者每一个 children 节点 type 均为 text 类型
  return node.children.every(item => {
    return item.type === 'VText'
  })
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  create,
  meta: {
    docs: {
      description: 'When there are no subcomponents, please use self-closing tag',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: 'code',
    schema: [
      {
        type: "object",
        properties: {
          exclude: { type: "array" }
        },
        additionalProperties: false
      }
    ]
  }
}
