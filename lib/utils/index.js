/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-06-26 17:31
 * @description
 */

module.exports = {
  /**
   * Register the given visitor to parser services.
   * If the parser service of `vue-eslint-parser` was not found,
   * this generates a warning.
   *
   * @param {RuleContext} context The rule context to use parser services.
   * @param {object} visitor The visitor.
   * @returns {void}
   */
  registerTemplateBodyVisitor (context, visitor) {
    if (context.parserServices.registerTemplateBodyVisitor == null) {
      context.report({
        loc: { line: 1, column: 0 },
        message: 'Use the latest vue-eslint-parser.'
      })
      return
    }
    context.parserServices.registerTemplateBodyVisitor(context, visitor)
  }
}