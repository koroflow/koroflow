'use client';

import {
	SandpackCodeEditor,
	SandpackConsole,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider,
} from '@codesandbox/sandpack-react';
import type {
	CodeEditorProps,
	PreviewProps,
	SandpackLayoutProps,
	SandpackProviderProps,
} from '@codesandbox/sandpack-react';
import type {
	ButtonHTMLAttributes,
	ComponentProps,
	HTMLAttributes,
} from 'react';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { cn } from '~/libs';

export type SandboxProviderProps = SandpackProviderProps;

export const SandboxProvider = ({
	className,
	...props
}: SandpackProviderProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<div className={cn('not-prose size-full max-h-[30rem]', className)}>
			<SandpackProvider className="!size-full !max-h-none" {...props} />
		</div>
	);
};

export type SandboxLayoutProps = SandpackLayoutProps;

export const SandboxLayout = ({ className, ...props }: SandpackLayoutProps) => (
	<SandpackLayout
		className={cn(
			'!rounded-none !border-none !bg-transparent !h-full',
			className
		)}
		{...props}
	/>
);

export type SandboxTabsContextValue = {
	selectedTab: string | undefined;
	setSelectedTab: (value: string) => void;
};

const SandboxTabsContext = createContext<SandboxTabsContextValue | undefined>(
	undefined
);

const useSandboxTabsContext = () => {
	const context = useContext(SandboxTabsContext);

	if (!context) {
		throw new Error(
			'SandboxTabs components must be used within a SandboxTabsProvider'
		);
	}

	return context;
};

export type SandboxTabsProps = HTMLAttributes<HTMLDivElement> & {
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
};

export const SandboxTabs = ({
	className,
	defaultValue,
	value,
	onValueChange,
	...props
}: SandboxTabsProps) => {
	const [selectedTab, setSelectedTabState] = useState(value || defaultValue);

	useEffect(() => {
		if (value !== undefined) {
			setSelectedTabState(value);
		}
	}, [value]);

	const setSelectedTab = useCallback(
		(newValue: string) => {
			if (value === undefined) {
				setSelectedTabState(newValue);
			}
			onValueChange?.(newValue);
		},
		[value, onValueChange]
	);

	return (
		<SandboxTabsContext.Provider value={{ selectedTab, setSelectedTab }}>
			<div
				className={cn(
					'group relative flex size-full flex-col overflow-hidden rounded-lg border text-sm',
					className
				)}
				{...props}
				data-selected={selectedTab}
			>
				{props.children}
			</div>
		</SandboxTabsContext.Provider>
	);
};

export type SandboxTabsListProps = HTMLAttributes<HTMLDivElement>;

export const SandboxTabsList = ({
	className,
	...props
}: SandboxTabsListProps) => (
	<div
		className={cn(
			'flex flex-row items-end gap-4 overflow-x-auto bg-fd-secondary px-4 text-fd-muted-foreground',
			className
		)}
		role="tablist"
		{...props}
	/>
);

export type SandboxTabsTriggerProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'onClick'
> & {
	value: string;
};

export const SandboxTabsTrigger = ({
	className,
	value,
	...props
}: SandboxTabsTriggerProps) => {
	const { selectedTab, setSelectedTab } = useSandboxTabsContext();

	return (
		// biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
		<button
			role="tab"
			aria-selected={selectedTab === value}
			data-state={selectedTab === value ? 'active' : 'inactive'}
			onClick={() => setSelectedTab(value)}
			className={cn(
				'flex flex-row items-center gap-2 whitespace-nowrap border-transparent py-2 font-medimedimedium transition-colors hover:text-fd-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-fd-primary data-[state=active]:text-fd-primary',
				className
			)}
			{...props}
		/>
	);
};

export type SandboxTabsContentProps = HTMLAttributes<HTMLDivElement> & {
	value: string;
};

export const SandboxTabsContent = ({
	className,
	value,
	...props
}: SandboxTabsContentProps) => {
	const { selectedTab } = useSandboxTabsContext();

	return (
		<div
			role="tabpanel"
			aria-hidden={selectedTab !== value}
			data-state={selectedTab === value ? 'active' : 'inactive'}
			className={cn(
				'min-h-[25rem] flex-1 overflow-y-auto ring-offset-background transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
				selectedTab === value
					? 'h-auto w-auto opacity-100'
					: 'pointer-events-none absolute h-0 w-0 opacity-0',
				className
			)}
			{...props}
		/>
	);
};

export type SandboxCodeEditorProps = CodeEditorProps;

export const SandboxCodeEditor = ({
	showTabs = false,
	...props
}: SandboxCodeEditorProps) => (
	<SandpackCodeEditor showTabs={showTabs} {...props} />
);

export type SandboxConsoleProps = ComponentProps<typeof SandpackConsole>;

export const SandboxConsole = ({
	className,
	...props
}: SandboxConsoleProps) => (
	<SandpackConsole className={cn('h-full', className)} {...props} />
);

export type SandboxPreviewProps = PreviewProps & {
	className?: string;
};

export const SandboxPreview = ({
	className,
	showOpenInCodeSandbox = false,
	...props
}: SandboxPreviewProps) => (
	<SandpackPreview
		className={cn('h-full', className)}
		showOpenInCodeSandbox={showOpenInCodeSandbox}
		{...props}
	/>
);

export type SandboxFileExplorerProps = ComponentProps<
	typeof SandpackFileExplorer
>;

export const SandboxFileExplorer = ({
	autoHiddenFiles = true,
	className,
	...props
}: SandboxFileExplorerProps) => (
	<SandpackFileExplorer
		className={cn('h-full', className)}
		autoHiddenFiles={autoHiddenFiles}
		{...props}
	/>
);
