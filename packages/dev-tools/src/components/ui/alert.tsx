import { type VariantProps, cva } from 'class-variance-authority';

import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../libs/utils';

const alertVariants = cva(
	'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				destructive:
					'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

const Alert = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
	<div
		ref={ref}
		role="alert"
		className={cn(alertVariants({ variant }), className)}
		{...props}
	/>
));
Alert.displayName = 'Alert';

const AlertTitle = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h5
		ref={ref}
		className={cn('mb-1 font-medium leading-none tracking-tight', className)}
		{...props}
	/>
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('text-sm [&_p]:leading-relaxed', className)}
		{...props}
	/>
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
