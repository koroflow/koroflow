"use client";

import * as Button from "../common/primitives/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../common/primitives/card";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { createPortal } from "react-dom";

import { ConsentCustomizationWidget } from "./consent-customization-widget";

import { useConsentManager } from "../common";
// import { Overlay } from "./atoms/overlay";
import "./consent-manager-dialog.css";

export interface ConsentCustomizationDialogProps {
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
	<Card className="consent-manager-dialog-card">
		<CardHeader className="relative">
			{showCloseButton && (
				<Button.Root
					// variant="ghost"
					// size="icon"
					className="consent-manager-dialog-header-close"
					onClick={onClose}
					aria-label="Close privacy settings"
				>
					<X className="h-4 w-4" />
				</Button.Root>
			)}
			<CardTitle id="privacy-settings-title">Privacy Settings</CardTitle>
			<CardDescription>
				Customize your privacy settings here. You can choose which types of cookies and tracking
				technologies you allow.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<ConsentCustomizationWidget onSave={handleSave} />
		</CardContent>
	</Card>
);

export const ConsentCustomizationDialog = React.forwardRef<
	HTMLDivElement,
	ConsentCustomizationDialogProps
>(({ children, triggerClassName, showCloseButton = false }, ref) => {
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
					{/* <Overlay /> */}
					<motion.dialog
						className="consent-manager-dialog-root"
						variants={dialogVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						aria-modal="true"
						aria-labelledby="privacy-settings-title"
					>
						<motion.div
							ref={contentRef}
							className="consent-manager-dialog-container"
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

	return isMounted && createPortal(dialogContent, document.body);
});
