import { createHash } from "node:crypto";

import cssnanoPlugin from "cssnano";
import postcss, { type Plugin } from "postcss";
import recast from "recast";
import tsParser from "recast/parsers/babel-ts.js";
import type { Config } from "tailwindcss";
import tailwindcss from "tailwindcss";

import { replaceVariableScope } from "./replace-variable-scope";

/**
 * A map of hashed classnames from Tailwind CSS classes and their original values
 */
type StyleCache = Map<string, string>;

const clRegex = /^kf-[a-z0-9]{8}$/;
const clTestRegex = /^kf-test/;

function isBinaryExpression(node: recast.types.namedTypes.BinaryExpression) {
	return recast.types.namedTypes.BinaryExpression.check(node);
}

function isLogicalExpression(node: recast.types.namedTypes.LogicalExpression) {
	return recast.types.namedTypes.LogicalExpression.check(node);
}

// biome-ignore lint/suspicious/noExplicitAny: too indepth to fix
function isRightmostOperand(path: any) {
	let parentPath = path.parentPath;
	while (isLogicalExpression(parentPath.node)) {
		if (parentPath.node.right !== path.node) {
			return false;
		}
		parentPath = parentPath.parentPath;
	}
	return true;
}

function generateHashedClassName(value: string) {
	return `kf-${createHash("sha256").update(value, "utf8").digest("hex").slice(0, 8)}`;
}

function visitNode(
	node: recast.types.ASTNode,
	ctx: { styleCache: StyleCache },
	visitors?: recast.types.Visitor,
) {
	recast.visit(node, {
		visitStringLiteral(path) {
			if (clRegex.test(path.node.value)) {
				return false;
			}
			if (clTestRegex.test(path.node.value)) {
				return false;
			}
			if (isBinaryExpression(path.parentPath.node)) {
				return false;
			}
			if (
				isLogicalExpression(path.parentPath.node) &&
				!isRightmostOperand(path)
			) {
				return false;
			}
			if (
				path.parentPath.node.type === "ObjectProperty" &&
				path.parentPath.node.key === path.node
			) {
				return false;
			}
			if (path.node.value === "" || path.node.value === " ") {
				return false;
			}
			const cn = generateHashedClassName(path.node.value);
			ctx.styleCache.set(cn, path.node.value);
			path.node.value = cn;
			return false;
		},
		...visitors,
	});
}

function transformBaseClassName(
	node: recast.types.namedTypes.ObjectProperty,
	ctx: { styleCache: StyleCache },
) {
	if (
		node.key.type === "Identifier" &&
		node.key.name === "baseClassName" &&
		node.value.type === "StringLiteral"
	) {
		const value = node.value.value;
		const cn = generateHashedClassName(value);
		ctx.styleCache.set(cn, value);
		node.value.value = cn;
		return true;
	}
	return false;
}

export function transform(code: string, ctx: { styleCache: StyleCache }) {
	const ast = recast.parse(code, { parser: tsParser });

	recast.visit(ast, {
		//@ts-expect-error
		visitObjectProperty(path) {
			const node = path.node;
			if (transformBaseClassName(node, ctx)) {
				return false;
			}
			if (node.key.type === "Identifier" && node.key.name === "className") {
				visitNode(node, ctx);
			}
			this.traverse(path);
		},
		visitJSXAttribute(path) {
			const node = path.node;
			if (node.name.name === "className") {
				visitNode(node, ctx, {
					visitCallExpression() {
						return false;
					},
				});
			}
			this.traverse(path);
		},
		visitCallExpression(path) {
			const node = path.node;
			if (
				node.callee.type === "Identifier" &&
				["cn", "cx", "clsx"].includes(node.callee.name)
			) {
				visitNode(node, ctx);
			}
			if (
				node.callee.type === "Identifier" &&
				node.callee.name === "cva" &&
				node.arguments[0]?.type === "ObjectExpression"
			) {
				for (const property of node.arguments[0].properties) {
					if (
						property.type === "ObjectProperty" &&
						property.key.type === "Identifier" &&
						["base", "variants"].includes(property.key.name)
					) {
						visitNode(property, ctx);
					}
				}
			}
			this.traverse(path);
		},
	});

	return recast.print(ast).code;
}

export async function generateStylesheet(
	styleCache: StyleCache,
	ctx: {
		/**
		 * Path to the Tailwind CSS configuration file
		 */
		tailwindConfig: Config;
		/**
		 * Global CSS to be included in the generated stylesheet
		 */
		globalCss?: string;
	},
) {
	let stylesheet = "@tailwind base;\n";

	stylesheet += ctx?.globalCss || "";

	for (const [cn, value] of styleCache) {
		stylesheet += `.${cn} { @apply ${value} }\n`;
	}

	const result = await postcss([
		tailwindcss(ctx.tailwindConfig) as Plugin,
		replaceVariableScope,
		cssnanoPlugin,
	]).process(stylesheet, {
		from: undefined,
	});

	return result.css;
}
