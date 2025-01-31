import { ConsentManagerDialog, ConsentManagerProvider, CookieBanner } from "@koroflow/elements";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import "./global.css";
import "@koroflow/elements/globals.css";

const inter = Inter({
	subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body className="flex flex-col min-h-screen">
				<RootProvider>
					<ConsentManagerProvider initialGdprTypes={["necessary", "marketing"]}>
						<CookieBanner />
						<ConsentManagerDialog />
						{children}
					</ConsentManagerProvider>
				</RootProvider>
			</body>
		</html>
	);
}
