'use client';

import type { LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { cn } from '../../libs/utils';

interface Tab {
	title: string;
	icon: LucideIcon;
	type?: never;
}

interface Separator {
	type: 'separator';
	title?: never;
	icon?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
	tabs: TabItem[];
	className?: string;
	activeColor?: string;
	onChange?: (index: number | null) => void;
}

const buttonVariants = {
	initial: {
		gap: 0,
		paddingLeft: '.5rem',
		paddingRight: '.5rem',
	},
	animate: (isSelected: boolean) => ({
		gap: isSelected ? '.5rem' : 0,
		paddingLeft: isSelected ? '1rem' : '.5rem',
		paddingRight: isSelected ? '1rem' : '.5rem',
	}),
};

const spanVariants = {
	initial: { width: 0, opacity: 0 },
	animate: { width: 'auto', opacity: 1 },
	exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: 'spring', bounce: 0, duration: 0.6 };

const Separator = memo(() => (
	<div className="mx-1 h-[24px] w-[1.2px] bg-border" aria-hidden="true" />
));
Separator.displayName = 'Separator';

const TabButton = memo(
	({
		tab,
		index,
		isSelected,
		activeColor,
		onClick,
	}: {
		tab: Tab;
		index: number;
		isSelected: boolean;
		activeColor: string;
		onClick: (index: number) => void;
	}) => {
		const Icon = tab.icon;

		return (
			<motion.button
				variants={buttonVariants}
				initial={false}
				animate="animate"
				custom={isSelected}
				onClick={() => onClick(index)}
				transition={transition}
				className={cn(
					'relative flex flex-grow items-center justify-center rounded-xl px-4 py-2 font-medium text-sm transition-colors duration-300',
					isSelected
						? cn('bg-muted', activeColor)
						: 'text-muted-foreground hover:bg-muted hover:text-foreground'
				)}
			>
				<Icon size={20} />
				<AnimatePresence initial={false}>
					{isSelected && (
						<motion.span
							variants={spanVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={transition}
							className="overflow-hidden whitespace-nowrap"
						>
							{tab.title}
						</motion.span>
					)}
				</AnimatePresence>
			</motion.button>
		);
	}
);
TabButton.displayName = 'TabButton';

export function ExpandableTabs({
	tabs,
	className,
	activeColor = 'text-primary',
	onChange,
}: ExpandableTabsProps) {
	const [selected, setSelected] = useState<number | null>(0);
	const outsideClickRef = useRef<HTMLDivElement>(null);

	const handleInitialChange = useCallback(() => {
		onChange?.(0);
	}, [onChange]);

	useEffect(() => {
		handleInitialChange();
	}, [handleInitialChange]);

	const handleOutsideClick = useCallback(() => {
		setSelected(null);
		onChange?.(null);
	}, [onChange]);

	//@ts-expect-error
	useOnClickOutside(outsideClickRef, handleOutsideClick);

	const handleSelect = useCallback(
		(index: number) => {
			setSelected(index);
			onChange?.(index);
		},
		[onChange]
	);

	const containerClassName = useMemo(
		() =>
			cn(
				'flex flex-wrap items-center gap-2 rounded-2xl border bg-background p-1 shadow-sm',
				className
			),
		[className]
	);

	return (
		<div ref={outsideClickRef} className={containerClassName}>
			{tabs.map((tab, index) =>
				tab.type === 'separator' ? (
					<Separator
						key={`separator-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							index
						}`}
					/>
				) : (
					<TabButton
						key={`${tab.title}-${index}`}
						tab={tab}
						index={index}
						isSelected={selected === index}
						activeColor={activeColor}
						onClick={handleSelect}
					/>
				)
			)}
		</div>
	);
}
