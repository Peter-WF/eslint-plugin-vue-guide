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
// 不对原生 html 标签做处理
const NATIVE_TAG = `a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h6,head,header,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,map,mark,menu,meta,meter,nav,noframes,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr`.split(',')

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
  const exclude = NATIVE_TAG.concat(option.exclude)

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
            const rangeStart = node.startTag.range[1] - 1
            // 解决如果标签本身没有闭合导致 endTag 为 null 报错问题
            const rangeEnd = node.endTag ? node.endTag.range[1] : node.startTag.range[1]

            // Expand the replacement range to include the surrounding
            // tokens to avoid conflicting with no-extra-semi.
            // https://github.com/eslint/eslint/issues/7928
            return fixer.replaceTextRange([
              rangeStart,
              rangeEnd
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
