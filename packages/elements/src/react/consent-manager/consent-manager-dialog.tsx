"use client";

import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { createPortal } from "react-dom";

import { useConsentManager } from "../common";
import "./consent-manager-dialog.css";
import { ConsentCustomizationCard } from "./atoms/dialog-card";
import { Overlay } from "./overlay";

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

export const ConsentManagerDialog = () => {
	const { isPrivacyDialogOpen, setIsPrivacyDialogOpen, saveConsents } = useConsentManager();
	const [isMounted, setIsMounted] = React.useState(false);
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	const handleSave = React.useCallback(() => {
		saveConsents("custom");
		setIsPrivacyDialogOpen(false);
	}, [setIsPrivacyDialogOpen, saveConsents]);

	const dialogContent = (
		<AnimatePresence mode="wait">
			{isPrivacyDialogOpen && (
				<>
					<Overlay />
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
							<ConsentCustomizationCard handleSave={handleSave} />
						</motion.div>
					</motion.dialog>
				</>
			)}
		</AnimatePresence>
	);

	return isMounted && createPortal(dialogContent, document.body);
};
