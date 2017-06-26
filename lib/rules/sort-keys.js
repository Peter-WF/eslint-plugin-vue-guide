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
  const sortBy = option.sortBy.split(' ')

  return {
    ExportDefaultDeclaration(program) {
      if (ext === '.vue') {
        const properties = [].slice.call(program.declaration.properties).map(function (item) {
          return item.key.name
        })

        const givensProperties = sortBy.filter(function (item) {
          return properties.indexOf(item) > -1
        })

        if (givensProperties.toString() !== properties.toString()) {
          context.report({
            program,
            loc: program.loc,
            message: "Expected A vue component Object should be sorted by the given list."
          })
        }
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
      description: 'require object keys to be sorted',
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
