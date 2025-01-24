"use client";

import { type Ref, forwardRef } from "react";
import { Box, type BoxProps } from "../../primitives/box";
import type { ClassNameStyle } from "../../theme";
import ConsentManagerWidget from "../consent-manager-widget";

type DialogCardProps = {
	children?: React.ReactNode;
} & ClassNameStyle;

const DialogCard = forwardRef<HTMLDivElement, DialogCardProps>(({ children, ...props }, ref) => {
	return (
		<Box
			ref={ref as Ref<HTMLDivElement>}
			baseClassName="card consent-manager-dialog-card"
			{...props}
			themeKey="consent-manager-widget.dialog.root"
		>
			{children}
		</Box>
	);
});

const DialogHeader = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-header consent-manager-dialog-card"
				{...props}
				themeKey="consent-manager-widget.dialog.header"
			>
				{children}
			</Box>
		);
	},
);

const DialogHeaderTitle = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-title"
				themeKey="consent-manager-widget.dialog.title"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const DialogHeaderDescription = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-title"
				themeKey="consent-manager-widget.dialog.title"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const DialogContent = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-content"
				themeKey="consent-manager-widget.dialog.content"
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const DialogFooter = forwardRef<HTMLDivElement, Omit<BoxProps, "themeKey">>(({ ...props }, ref) => {
	return (
		<Box
			ref={ref as Ref<HTMLDivElement>}
			baseClassName="card-footer"
			themeKey="consent-manager-widget.dialog.footer"
			{...props}
		>
			<a className="consent-manager-widget-branding-link" href="https://koroflow.com">
				Secured by <span className="consent-manager-widget-branding-link-span">Koroflow</span>
			</a>
		</Box>
	);
});

export const ConsentCustomizationCard = ({
	handleSave,
}: {
	handleSave: () => void;
}) => (
	<DialogCard>
		<DialogHeader>
			<DialogHeaderTitle>Privacy Settings</DialogHeaderTitle>
			<DialogHeaderDescription>
				Customize your privacy settings here. You can choose which types of cookies and tracking
				technologies you allow.
			</DialogHeaderDescription>
		</DialogHeader>
		<DialogContent>
			<ConsentManagerWidget hideBranding={true} onSave={handleSave} />
		</DialogContent>
		<DialogFooter>
			<a className="consent-manager-widget-branding-link" href="https://koroflow.com">
				Secured by <span className="consent-manager-widget-branding-link-span">Koroflow</span>
			</a>
		</DialogFooter>
	</DialogCard>
);
