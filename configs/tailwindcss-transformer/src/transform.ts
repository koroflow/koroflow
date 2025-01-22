import recast from "recast";
import tsParser from "recast/parsers/babel-ts.js";
import type { StyleCache } from "./types";
import { generateHashedClassName } from "./utils/hash";
import { visitNode } from "./visitors/base-visitor";

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

/**
 * Transforms class names in TypeScript/JavaScript code by hashing them
 * and storing the mapping in a style cache.
 *
 * @param code - The source code to transform
 * @param ctx - Context containing the style cache
 * @returns The transformed code with hashed class names
 *
 * @remarks
 * This function parses the code into an AST and visits various nodes to transform
 * class names in different contexts (className props, cva calls, tv calls, etc.)
 *
 * @public
 */

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

			if (node.callee.type === "Identifier" && ["cn", "cx", "clsx"].includes(node.callee.name)) {
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
			if (
				node.callee.type === "Identifier" &&
				node.callee.name === "tv" &&
				node.arguments[0]?.type === "ObjectExpression"
			) {
				// Process the tv options object
				for (const property of node.arguments[0].properties) {
					if (property.type === "ObjectProperty" && property.key.type === "Identifier") {
						// Handle slots
						if (property.key.name === "slots" && property.value.type === "ObjectExpression") {
							for (const slot of property.value.properties) {
								if (slot.type === "ObjectProperty") {
									if (slot.value.type === "ArrayExpression") {
										for (const element of slot.value.elements) {
											if (element?.type === "StringLiteral") {
												const hash = generateHashedClassName(element.value);
												ctx.styleCache.set(hash, element.value);
												element.value = hash;
											}
										}
									} else if (slot.value.type === "StringLiteral") {
										const hash = generateHashedClassName(slot.value.value);
										ctx.styleCache.set(hash, slot.value.value);
										slot.value.value = hash;
									}
								}
							}
						}

						// Handle variants
						if (property.key.name === "variants" && property.value.type === "ObjectExpression") {
							for (const variantProperty of property.value.properties) {
								if (
									variantProperty.type === "ObjectProperty" &&
									variantProperty.value.type === "ObjectExpression"
								) {
									for (const variantValue of variantProperty.value.properties) {
										if (variantValue.type === "ObjectProperty") {
											if (variantValue.value.type === "StringLiteral") {
												const hash = generateHashedClassName(variantValue.value.value);
												ctx.styleCache.set(hash, variantValue.value.value);
												variantValue.value.value = hash;
											} else if (variantValue.value.type === "ObjectExpression") {
												for (const slotProperty of variantValue.value.properties) {
													if (
														slotProperty.type === "ObjectProperty" &&
														slotProperty.value.type === "StringLiteral"
													) {
														const hash = generateHashedClassName(slotProperty.value.value);
														ctx.styleCache.set(hash, slotProperty.value.value);
														slotProperty.value.value = hash;
													}
												}
											}
										}
									}
								}
							}
						}

						// Handle compound variants
						if (
							property.key.name === "compoundVariants" &&
							property.value.type === "ArrayExpression"
						) {
							for (const compoundVariant of property.value.elements) {
								if (compoundVariant?.type === "ObjectExpression") {
									const classProperty = compoundVariant.properties.find(
										(p) =>
											p.type === "ObjectProperty" &&
											p.key.type === "Identifier" &&
											(p.key.name === "class" || p.key.name === "className"),
									);

									if (classProperty?.type === "ObjectProperty") {
										if (classProperty.value.type === "ObjectExpression") {
											for (const slotProperty of classProperty.value.properties) {
												if (slotProperty.type === "ObjectProperty") {
													if (slotProperty.value.type === "ArrayExpression") {
														for (const element of slotProperty.value.elements) {
															if (element?.type === "StringLiteral") {
																const hash = generateHashedClassName(element.value);
																ctx.styleCache.set(hash, element.value);
																element.value = hash;
															}
														}
													} else if (slotProperty.value.type === "StringLiteral") {
														const hash = generateHashedClassName(slotProperty.value.value);
														ctx.styleCache.set(hash, slotProperty.value.value);
														slotProperty.value.value = hash;
													}
												}
											}
										} else if (classProperty.value.type === "StringLiteral") {
											const hash = generateHashedClassName(classProperty.value.value);
											ctx.styleCache.set(hash, classProperty.value.value);
											classProperty.value.value = hash;
										}
									}
								}
							}
						}
					}
				}
			}

			this.traverse(path);
		},
	});

	return recast.print(ast).code;
}
