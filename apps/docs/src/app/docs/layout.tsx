import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { docsOptions } from "~/app/layout.config";
import { source } from "~/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout tree={source.pageTree} {...docsOptions}>
			{children}
		</DocsLayout>
	);
}
