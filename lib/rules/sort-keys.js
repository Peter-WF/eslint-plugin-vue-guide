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
// 默认排序
const DEFAULT_SORYBY = 'name props data computed watch methods filter created mounted updated destroyed components'

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
  const option = context.options[0] || {};
  const sortBy = (option.sortBy || DEFAULT_SORYBY).split(' ')
  return {
    ExportDefaultDeclaration(node) {
      if (ext !== '.vue') {
        return;
      }

      // 当前对象属性
      const properties = [].slice.call(node.declaration.properties).map(function (item) {
        return item.key.name
      }).filter(item => {
        return sortBy.indexOf(item) > -1
      })

      // 规则定义的属性顺序
      const givensProperties = sortBy.filter(function (item) {
        return properties.indexOf(item) > -1
      })

      // console.log('sort-key：' + context.eslint.getFilename())
      // console.log('sort-key：目前排序' + properties.toString())
      // console.log('sort-key：推荐排序' + givensProperties.toString())

      // 判断组件属性是否与规则一致
      if (properties.toString() !== givensProperties.toString()) {
        context.report({
          node,
          loc: node.loc,
          message: "Expected a vue component Object should be sorted by the given list.",
          fix (fixer) {
            let lastRange = node.declaration.range[0] + 1;

            const newPropertiesText = node.declaration.properties
              .map(property => {
                let propertyObj = {
                  name: property.key.name,
                  nodeText: sourceCode.getText().slice(lastRange, property.range[1])
                };
                lastRange = property.range[1] + 1
                return propertyObj
              })
              .sort((property0, property1) => {
                return sorter(property0.name, property1.name)
              })
              .map(property => {
                // return property.nodeText.replace(/\n/g, '\n')
                return property.nodeText
              })
              .join(",");

            const rangeStart = node.declaration.range[0] + 1;
            const rangeEnd = node.declaration.properties.slice(-1)[0].range[1];

            // Expand the replacement range to include the surrounding
            // tokens to avoid conflicting with no-extra-semi.
            // https://github.com/eslint/eslint/issues/7928
            return fixer.replaceTextRange([
              rangeStart,
              rangeEnd
            ], newPropertiesText);
          }
        })
      }

      function sorter (first, second) {
        return sortBy.indexOf(first) - sortBy.indexOf(second)
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
      description: 'require object keys to be sorted in a vue template',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: 'code',
    schema: [
      {
        type: "object",
        properties: {
          sortBy: { type: "string" }
        },
        additionalProperties: false
      }
    ]
  }
}
