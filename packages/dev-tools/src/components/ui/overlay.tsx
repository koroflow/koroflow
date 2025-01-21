import { AnimatePresence, motion } from "motion/react";
import type React from "react";

interface OverlayProps {
	show: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({ show }) => {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-overlay p-4 backdrop-blur-[10px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				/>
			)}
		</AnimatePresence>
	);
};
