"use client";

import { useConsentManager } from "@koroflow/elements/headless";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { createPortal } from "react-dom";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Overlay } from "../consent/overlay";
import ConsentManagerWidget from "./consent-manager-widget";

export interface ConsentManagerDialogProps {
	children?: React.ReactNode;
	triggerClassName?: string;
	showCloseButton?: boolean;
}

const dialogVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

const contentVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { type: "spring", stiffness: 300, damping: 30 },
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		transition: { duration: 0.2 },
	},
};

const ConsentCustomizationCard = ({
	onClose,
	showCloseButton,
	handleSave,
	ref,
}: {
	onClose: () => void;
	showCloseButton: boolean;
	handleSave: () => void;
	ref: React.RefObject<HTMLDivElement>;
}) => (
	<Card>
		<CardHeader className="relative">
			{showCloseButton && (
				<Button
					variant="ghost"
					size="icon"
					className="absolute right-2 top-2"
					onClick={onClose}
					aria-label="Close privacy settings"
				>
					<X className="h-4 w-4" />
				</Button>
			)}
			<CardTitle id="privacy-settings-title">Privacy Settings</CardTitle>
			<CardDescription>
				Customize your privacy settings here. You can choose which types of cookies and tracking
				technologies you allow.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<ConsentManagerWidget onSave={handleSave} />
		</CardContent>
	</Card>
);

export const ConsentManagerDialog = React.forwardRef<HTMLDivElement, ConsentManagerDialogProps>(
	({ children, triggerClassName, showCloseButton = false }, ref) => {
		const { isPrivacyDialogOpen, setIsPrivacyDialogOpen, setShowPopup, saveConsents } =
			useConsentManager();
		const [isMounted, setIsMounted] = React.useState(false);
		const contentRef = React.useRef<HTMLDivElement>(null);

		React.useEffect(() => {
			setIsMounted(true);
			return () => setIsMounted(false);
		}, []);

		const handleOpenChange = React.useCallback(
			(newOpen: boolean) => {
				setIsPrivacyDialogOpen(newOpen);
				if (newOpen) {
					setShowPopup(false);
				}
			},
			[setIsPrivacyDialogOpen, setShowPopup],
		);

		const handleSave = React.useCallback(() => {
			saveConsents("custom");
			setIsPrivacyDialogOpen(false);
		}, [setIsPrivacyDialogOpen, saveConsents]);

		const handleClose = React.useCallback(() => {
			setIsPrivacyDialogOpen(false);
		}, [setIsPrivacyDialogOpen]);

		const dialogContent = (
			<AnimatePresence mode="wait">
				{isPrivacyDialogOpen && (
					<>
						<Overlay show={isPrivacyDialogOpen} />
						<motion.dialog
							className="fixed inset-0 z-50 flex items-center justify-center"
							variants={dialogVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							aria-modal="true"
							aria-labelledby="privacy-settings-title"
						>
							<motion.div
								ref={contentRef}
								className="z-50 w-full max-w-md mx-auto"
								variants={contentVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
							>
								<ConsentCustomizationCard
									ref={ref as React.RefObject<HTMLDivElement>}
									onClose={handleClose}
									showCloseButton={showCloseButton}
									handleSave={handleSave}
								/>
							</motion.div>
						</motion.dialog>
					</>
				)}
			</AnimatePresence>
		);

		return (
			<>
				<div
					onClick={() => handleOpenChange(true)}
					onKeyUp={(e) => e.key === "Enter" && handleOpenChange(true)}
					onKeyDown={(e) => e.key === "Enter" && handleOpenChange(true)}
				>
					{children || (
						<Button variant="outline" size="sm" className={triggerClassName}>
							Customize Consent
						</Button>
					)}
				</div>
				{isMounted && createPortal(dialogContent, document.body)}
			</>
		);
	},
);
