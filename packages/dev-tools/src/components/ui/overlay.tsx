import { AnimatePresence, motion } from 'motion/react';
import type { FC } from 'react';

interface OverlayProps {
	show: boolean;
}

export const Overlay: FC<OverlayProps> = ({ show }) => {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-overlay p-4 backdrop-blur-[10px] data-[state=closed]:animate-out data-[state=open]:animate-in"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				/>
			)}
		</AnimatePresence>
	);
};
