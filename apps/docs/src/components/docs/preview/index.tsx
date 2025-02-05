import {
	SandboxCodeEditor,
	SandboxConsole,
	SandboxFileExplorer,
	SandboxLayout,
	SandboxPreview,
	type SandboxProvider,
	SandboxTabs,
	SandboxTabsContent,
	SandboxTabsList,
	SandboxTabsTrigger,
} from '@koroflow/shadcn/components';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@koroflow/shadcn/components';
import { AppWindowIcon, CodeIcon, TerminalIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { PreviewProvider } from './provider';
import { tsconfig } from './tsconfig';
import { utils } from './utils';

type PreviewProps = {
	name: string;
	code: string;
	dependencies?: Record<string, string>;
};

export const Preview = ({
	code,
	dependencies: demoDependencies,
}: PreviewProps) => {
	const dependencies: Record<string, string> = {};
	const devDependencies: Record<string, string> = {};

	const files: ComponentProps<typeof SandboxProvider>['files'] = {
		'/App.tsx': code,
		'/tsconfig.json': tsconfig,
		'/lib/utils.ts': utils,
	};

	// Scan the demo code for any imports of shadcn/ui components
	// await parseShadcnComponents(code);

	// Load demo dependencies
	if (demoDependencies) {
		for (const [name, version] of Object.entries(demoDependencies)) {
			dependencies[name] = version;
		}
	}

	return (
		<PreviewProvider
			template="react-ts"
			options={{
				externalResources: [
					'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
				],
			}}
			customSetup={{
				dependencies: {
					...dependencies,
					// koroflow
					'@koroflow/elements': 'latest',
				},
				devDependencies: {
					...devDependencies,
				},
			}}
			files={files}
			className="not-prose max-h-[30rem]"
		>
			<SandboxLayout>
				<SandboxTabs defaultValue="preview">
					<SandboxTabsList>
						<SandboxTabsTrigger value="code">
							<CodeIcon size={14} />
							Code
						</SandboxTabsTrigger>
						<SandboxTabsTrigger value="preview">
							<AppWindowIcon size={14} />
							Preview
						</SandboxTabsTrigger>
						<SandboxTabsTrigger value="console">
							<TerminalIcon size={14} />
							Console
						</SandboxTabsTrigger>
					</SandboxTabsList>
					<SandboxTabsContent value="code" className="overflow-hidden">
						<ResizablePanelGroup
							direction="horizontal"
							className="overflow-hidden"
						>
							<ResizablePanel
								className="!overflow-y-auto bg-[var(--sp-colors-surface1)]"
								defaultSize={25}
								minSize={20}
								maxSize={40}
							>
								<SandboxFileExplorer />
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel className="!overflow-y-auto bg-[var(--sp-colors-surface1)]">
								<SandboxCodeEditor />
							</ResizablePanel>
						</ResizablePanelGroup>
					</SandboxTabsContent>
					<SandboxTabsContent value="preview">
						<SandboxPreview />
					</SandboxTabsContent>
					<SandboxTabsContent value="console">
						<SandboxConsole />
					</SandboxTabsContent>
				</SandboxTabs>
			</SandboxLayout>
		</PreviewProvider>
	);
};
