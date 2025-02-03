type AsProp<T extends React.ElementType> = {
	as?: T;
};

type PropsToOmit<T extends React.ElementType, P> = keyof (AsProp<T> & P);

type PolymorphicComponentProp<
	T extends React.ElementType,
	Props extends Record<string, unknown> = Record<string, unknown>,
> = React.PropsWithChildren<Props & AsProp<T>> &
	Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

export type PolymorphicRef<T extends React.ElementType> =
	React.ComponentPropsWithRef<T>["ref"];

type PolymorphicComponentPropWithRef<
	T extends React.ElementType,
	Props extends Record<string, unknown> = Record<string, unknown>,
> = PolymorphicComponentProp<T, Props> & { ref?: PolymorphicRef<T> };

export type PolymorphicComponentPropsWithRef<
	T extends React.ElementType,
	P extends Record<string, unknown> = Record<string, unknown>,
> = PolymorphicComponentPropWithRef<T, P>;

export type PolymorphicComponentProps<
	T extends React.ElementType,
	P extends Record<string, unknown> = Record<string, unknown>,
> = PolymorphicComponentProp<T, P>;

export type PolymorphicComponent<P extends Record<string, unknown>> = <
	T extends React.ElementType,
>(
	props: PolymorphicComponentPropsWithRef<T, P>,
) => React.ReactNode;
