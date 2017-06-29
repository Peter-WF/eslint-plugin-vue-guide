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
  const option = context.options[0] || {};
  const sortBy = option.sortBy ? option.sortBy.split(' ') : []
  return {

  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  create,
  meta: {
    docs: {
      description: 'require attribute keys to be sorted in <template>',
      category: 'Stylistic Issues',
      recommended: false
    },
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
