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
 * Creates AST event handlers for sort-attrs
 *
 * @param {RuleContext} context - The rule context.
 * @returns {object} AST event handlers.
 */
function create (context) {
  const sourceCode = context.getSourceCode()
  const option = context.options[0] || {};
  // 属性的分别是 渲染指令, 一般指令, 静态属性, 动态属性, 事件处理器
  const weight = Object.assign({
    'conditional': 10000,
    'directives': 1000,
    'literal-props': 100,
    'dynamic-props': 10,
    'events': 1
  }, option)
  // 属性权重对象列表
  let attributes = []
  utils.registerTemplateBodyVisitor(context, {
    'VElement' (node) {
      if (node.parent.type !== 'VElement') {
        return
      }
    },
    'VStartTag' () {
      attributes = []
    },
    'VAttribute' (node) {
      const name = sourceCode.getText().slice(node.key.range[0], node.key.range[1])
      let type = getWeightType(name)

      attributes.push({
        name: name,
        weight: weight[type]
      })
    },
    'VEndTag' (node) {
      // 判断当前属性排序是否有
      let originSort = attributes.map(item => {
        return item.name
      }).toString()
      let recommendedSort = attributes.sort((first, second) => {
        if (first.weight < second.weight) {
          return 1
        } else if (first.weight > second.weight) {
          return -1
        } else {
          return 0
        }
      }).map(item => {
        return item.name
      }).toString()
      if (originSort.indexOf(recommendedSort) === -1) {
        // console.log(`sort-attrs：${context.eslint.getFilename()}`)
        // console.log(`sort-attrs：目前排序${originSort}`)
        // console.log(`sort-attrs：推荐排序${recommendedSort}`)
        context.report({
          node,
          loc: node.loc,
          message: `Expected attribute of the element keys should be sorted in <template>`
        })
      }
    }
  })
  return {}
}

/**
 * 获取权重类型
 * @returns {string}
 */
function getWeightType (name) {
  if (/^v-(if|show|else)/.test(name)) {
    return 'conditional'
  } else if (/^v-/.test(name)) {
    return 'directives'
  } else if (/^@/.test(name)) {
    return 'events'
  } else if (/^:/.test(name)) {
    return 'dynamic-props'
  } else {
    return 'literal-props'
  }
}
// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Expected attribute of the element keys should be sorted in <template>',
      category: 'Stylistic Issues',
      recommended: false
    },
    schema: [
      {
        type: 'object',
        properties: {
          'conditional': {
            type: 'number'
          },
          'directives': {
            type: 'number'
          },
          'literal-props': {
            type: 'number'
          },
          'dynamic-props': {
            type: 'number'
          },
          'events': {
            type: 'number'
          }
        },
        additionalProperties: false
      }
    ]
  }
}
