"use client";

import { AnimatePresence, motion } from "motion/react";

import { createPortal } from "react-dom";

import { useConsentManager } from "../common";
import "./consent-manager-dialog.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../theme";
import { ConsentCustomizationCard } from "./atoms/dialog-card";
import { Overlay } from "./atoms/overlay";
import type { ConsentManagerWidgetTheme } from "./theme";

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

export const ConsentManagerDialog = ({
	theme = {},
}: { theme: Partial<ConsentManagerWidgetTheme> }) => {
	const consentManager = useConsentManager();
	const [isMounted, setIsMounted] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	const handleSave = useCallback(() => {
		consentManager.saveConsents("custom");
		consentManager.setIsPrivacyDialogOpen(false);
	}, [consentManager]);

	const dialogContent = (
		<ThemeContext.Provider
			value={{
				...consentManager,
				theme,
				disableAnimation: false,
			}}
		>
			<AnimatePresence mode="wait">
				{consentManager.isPrivacyDialogOpen && (
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
		</ThemeContext.Provider>
	);

	return isMounted && createPortal(dialogContent, document.body);
};
