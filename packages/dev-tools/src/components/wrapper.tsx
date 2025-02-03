'use client';

import { Shield } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../libs/utils';
import { Button } from './ui/button';
import { Card } from './ui/card';

/**
 * Dev Tool Wrapper Component
 *
 * This component serves as both an icon and a wrapper for the development tool interface.
 * It provides a button that, when clicked, toggles the visibility of a pop-up containing
 * the router pages.
 *
 * @component
 * @returns {JSX.Element} The rendered component
 */
export function DevToolWrapper({
	children,
	isOpen,
	toggleOpen,
	position = 'bottom-right',
}: {
	children: ReactNode;
	isOpen: boolean;
	toggleOpen: () => void;
	position?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';
}) {
	// Track whether component is mounted to handle client-side only features
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	const DevToolContent = (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="fixed inset-0 bg-background/10 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={toggleOpen}
					/>
					<motion.div
						className={cn(
							'fixed z-[9999]',
							position === 'bottom-right' && 'right-4 bottom-4',
							position === 'top-right' && 'top-4 right-4',
							position === 'bottom-left' && 'bottom-4 left-4',
							position === 'top-left' && 'top-4 left-4'
						)}
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					>
						<Card className="w-[350px] shadow-lg">{children}</Card>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return (
		<>
			<AnimatePresence>
				{!isOpen && (
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className="fixed right-4 bottom-4 z-[9999]"
					>
						<Button
							variant="outline"
							size="icon"
							className="h-10 w-10 rounded-full shadow-lg"
							onClick={toggleOpen}
						>
							<Shield className="h-4 w-4" />
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
			{isMounted && createPortal(DevToolContent, document.body)}
		</>
	);
}

export default DevToolWrapper;
