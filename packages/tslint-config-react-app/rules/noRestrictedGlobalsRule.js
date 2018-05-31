'use strict';
// Copied from the following PR https://github.com/palantir/tslint/pull/3824
// This should be temporary! As soon as PR is merged delete this code. If it is not approved, perhaps make PR in https://www.npmjs.com/package/tslint-eslint-rules
const ts = require('typescript');
const Lint = require('tslint');

class Rule extends Lint.Rules.TypedRule {
  applyWithProgram(sourceFile, program) {
    const bannedGlobals = new Set(this.ruleArguments);
    return this.applyWithFunction(
      sourceFile,
      walk,
      bannedGlobals,
      program.getTypeChecker()
    );
  }
}

Rule.metadata = {
  ruleName: 'no-restricted-globals',
  description: 'Disallow specific global variables.',
  descriptionDetails: Lint.Utils.dedent`
        Disallowing usage of specific global variables can be useful if you want to allow
        a set of global variables by enabling an environment, but still want to disallow
        some of those. For instance, early Internet Explorer versions exposed the current
        DOM event as a global variable event, but using this variable has been considered
        as a bad practice for a long time. Restricting this will make sure this variable
        isn’t used in browser code.
    `,
  optionsDescription:
    'This rule takes a list of strings, where each string is a global to be restricted.',
  options: {
    type: 'list',
    items: { type: 'string' },
  },
  optionExamples: [[true, 'name', 'length', 'event']],
  type: 'functionality',
  typescriptOnly: false,
  requiresTypeInfo: true,
};

Rule.FAILURE_STRING = function(name) {
  return `Unexpected global variable '${name}'. Use local parameter instead.`;
};

exports.Rule = Rule;

function walk(ctx, checker) {
  return ts.forEachChild(ctx.sourceFile, function recur(node) {
    switch (node.kind) {
      case ts.SyntaxKind.TypeReference:
        // Ignore types.
        return;
      case ts.SyntaxKind.PropertyAccessExpression:
        // Ignore `y` in `x.y`, but recurse to `x`.
        return recur(node.expression);
      case ts.SyntaxKind.Identifier:
        return checkIdentifier(node);
      default:
        return ts.forEachChild(node, recur);
    }
  });

  function checkIdentifier(node) {
    if (!ctx.options.has(node.text)) {
      return;
    }

    const symbol = checker.getSymbolAtLocation(node);
    const declarations = symbol === undefined ? undefined : symbol.declarations;
    if (declarations === undefined || declarations.length === 0) {
      return;
    }

    const declaredInLibDom = declarations.some(decl =>
      decl.getSourceFile().fileName.endsWith('.d.ts')
    );

    if (declaredInLibDom) {
      ctx.addFailureAtNode(node, Rule.FAILURE_STRING(node.text));
    }
  }
}
