"use client";

import { X } from "lucide-react";
import { type Ref, forwardRef } from "react";
import { Box, type BoxProps } from "../../primitives/box";
import * as Button from "../../ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../ui/components/card";
import ConsentManagerWidget from "../consent-manager-widget";

const DialogCard = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card consent-manager-dialog-card"
				styleKey={["dialog", "root"]}
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const DialogHeader = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-header consent-manager-dialog-card"
				styleKey={["dialog", "header"]}
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const DialogHeaderTitle = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-title"
				styleKey={["dialog", "title"]}
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const DialogHeaderDescription = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-title"
				styleKey={["dialog", "title"]}
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const DialogContent = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(
	({ children, ...props }, ref) => {
		return (
			<Box
				ref={ref as Ref<HTMLDivElement>}
				baseClassName="card-content"
				styleKey={["dialog", "content"]}
				{...props}
			>
				{children}
			</Box>
		);
	},
);

const DialogFooter = forwardRef<HTMLDivElement, Omit<BoxProps, "styleKey">>(({ ...props }, ref) => {
	return (
		<Box
			ref={ref as Ref<HTMLDivElement>}
			baseClassName="card-footer"
			styleKey={["dialog", "footer"]}
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
	<DialogCard className="consent-manager-dialog-card">
		<DialogHeader className="relative">
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
