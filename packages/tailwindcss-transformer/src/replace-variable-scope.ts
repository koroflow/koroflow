
import type { Declaration, Plugin } from 'postcss';
import valueParser, { type ParsedValue } from 'postcss-value-parser';

export const replaceVariableScope: Plugin = {
  postcssPlugin: 'Replace variable scope',
  Declaration(decl: Declaration) {
    if (decl.prop.startsWith('--tw-')) {
      decl.prop = decl.prop.replace('--tw-', '--kf-');
    }
    const value: ParsedValue = valueParser(decl.value);
    value.walk(node => {
      if (node.type === 'function' && node.value === 'var') {
        for (const n of node.nodes) {
          if (n.type === 'word' && n.value.startsWith('--tw-')) {
            n.value = n.value.replace('--tw-', '--kf-');
          }
        }
      }
    });
    decl.value = value.toString();
  },
};
