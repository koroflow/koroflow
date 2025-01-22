import recast from "recast";
import type { StyleCache } from "../types";
import { clRegex, clTestRegex, generateHashedClassName } from "../utils/hash";

/**
 * Base visitor implementation for transforming class names in AST nodes
 * @param node - The AST node to visit
 * @param ctx - Context containing the style cache
 * @param visitors - Optional additional visitors
 * @internal
 */
export function visitNode(
	node: recast.types.ASTNode,
	ctx: { styleCache: StyleCache },
	visitors?: recast.types.Visitor,
) {
	if (!node) return;

	recast.visit(node, {
		visitStringLiteral(path) {
			if (!path?.node) return false;
			const value = path.node.value;

			if (!value || value === "" || value === " ") {
				return false;
			}
			if (clRegex.test(value)) {
				return false;
			}
			if (clTestRegex.test(value)) {
				return false;
			}

			const cn = generateHashedClassName(value);
			ctx.styleCache.set(cn, value);
			path.node.value = cn;

			return false;
		},
		...visitors,
	});
}
