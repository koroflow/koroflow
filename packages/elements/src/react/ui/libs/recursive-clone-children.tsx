import * as React from 'react';

/**
 * Recursively clones React children, adding additional props to components with matched display names.
 *
 * @param children - The node(s) to be cloned.
 * @param additionalProps - The props to add to the matched components.
 * @param displayNames - An array of display names to match components against.
 * @param uniqueId - A unique ID prefix from the parent component to generate stable keys.
 * @param asChild - Indicates whether the parent component uses the Slot component.
 *
 * @returns The cloned node(s) with the additional props applied to the matched components.
 */
export function recursiveCloneChildren(
	children: React.ReactNode,
	additionalProps: Record<string, unknown>,
	displayNames: string[],
	uniqueId: string,
	asChild?: boolean
): React.ReactNode | React.ReactNode[] {
	const mappedChildren = React.Children.map(children, (child: React.ReactNode) => {
		if (!React.isValidElement(child)) {
			return child;
		}

		const displayName = (child.type as React.ComponentType)?.displayName || '';
		const newProps = displayNames.includes(displayName) ? additionalProps : {};

		const childProps = (child as React.ReactElement<Record<string, unknown>>).props;

		return React.cloneElement(
			child,
			{ ...newProps, key: `${uniqueId}-${child.key || displayName}` },
			recursiveCloneChildren(
				childProps?.children as React.ReactNode,
				additionalProps,
				displayNames,
				uniqueId,
				childProps?.asChild as boolean | undefined
			)
		);
	});

	return asChild ? mappedChildren?.[0] : mappedChildren;
}
