'use client';

import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import logo from '../../../public/logo.svg';
import { navigation } from './navigation';
import { LargeSearchToggle } from './search';

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

	const isLinkActive = (href: string) => {
		// Handle exact matches for root docs
		if (href === '/docs') {
			return pathname === '/docs' || pathname === '/docs/';
		}
		// Handle nested routes like /docs/release-notes
		if (href.startsWith('/docs/')) {
			return pathname === href || pathname.startsWith(`${href}/`);
		}
		// Handle home page
		if (href === '/') {
			return pathname === '/';
		}
		return false;
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="fixed top-0 z-40 w-full border-fd-border border-b bg-fd-background lg:sticky dark:border-fd-border dark:bg-fd-background">
			<div className="mx-auto max-w-8xl">
				<div className="flex h-16 items-center justify-between px-4 lg:px-12">
					<div className="flex items-center">
						<Link href="/" className="flex flex-shrink-0 flex-row gap-4">
							<Image
								src={logo}
								alt="Koroflow"
								width={93}
								height={16}
								className="h-4 w-auto dark:invert"
							/>
							<span className="inline-flex items-center rounded-full border bg-fd-primary/10 px-2.5 py-0.5 font-semibold text-fd-primary text-xs">
								Beta
							</span>
						</Link>
					</div>

					<div className="mx-4 hidden flex-1 lg:flex lg:justify-center">
						<div className="w-full max-w-lg">
							<LargeSearchToggle />
						</div>
					</div>

					<div className="hidden items-center space-x-6 lg:flex">
						{navigation.mainLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className={`font-medium text-sm ${
									isLinkActive(link.href)
										? // ? link.highlight
											// 	? 'rounded-full bg-fd-primary px-4 py-2 text-fd-primary-foreground'
											// 	: 'text-fd-foreground'
											// : link.highlight
											'rounded-full bg-fd-primary px-4 py-2 text-fd-primary-foreground transition duration-150 ease-in-out hover:bg-fd-primary/90'
										: 'text-fd-muted-foreground hover:text-fd-foreground dark:text-fd-muted-foreground dark:hover:text-fd-foreground'
								}`}
							>
								{link.name}
							</Link>
						))}
						<ThemeToggle />
					</div>

					<div className="flex lg:hidden">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={toggleMobileMenu}
							className="text-fd-muted-foreground hover:text-fd-foreground dark:text-fd-muted-foreground dark:hover:text-fd-foreground"
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

				<div className="hidden h-12 border-fd-border border-t px-12 lg:flex dark:border-fd-border">
					<div className="flex space-x-6">
						{navigation.secondaryLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className={`flex items-center font-medium text-sm ${
									isLinkActive(link.href)
										? 'border-fd-primary border-b-2 text-fd-foreground dark:text-fd-foreground'
										: 'text-fd-muted-foreground hover:text-fd-foreground dark:text-fd-muted-foreground dark:hover:text-fd-foreground'
								}`}
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`fixed inset-0 z-50 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
			>
				{/* biome-ignore lint/nursery/noStaticElementInteractions: <explanation> */}
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					className="fixed inset-0 bg-fd-background/50"
					onClick={toggleMobileMenu}
				/>
				<div className="fixed inset-y-0 right-0 w-full max-w-xs overflow-y-auto bg-fd-background shadow-xl dark:bg-fd-background">
					<div className="space-y-6 p-6">
						<div className="flex items-center justify-between">
							<Link href="/" className="flex-shrink-0">
								<Image
									src="https://mintlify.s3.us-west-1.amazonaws.com/anthropic/logo/light.svg"
									alt="Anthropic"
									width={112}
									height={28}
									className="h-7 w-auto dark:hidden"
								/>
								<Image
									src="https://mintlify.s3.us-west-1.amazonaws.com/anthropic/logo/dark.svg"
									alt="Anthropic"
									width={112}
									height={28}
									className="hidden h-7 w-auto dark:block"
								/>
							</Link>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={toggleMobileMenu}
								className="text-fd-muted-foreground hover:text-fd-foreground dark:text-fd-muted-foreground dark:hover:text-fd-foreground"
							>
								<X className="h-6 w-6" />
							</button>
						</div>
						<div className="space-y-4">
							{navigation.mainLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className={`block font-medium text-base ${
										isLinkActive(link.href)
											? 'text-fd-foreground'
											: 'text-fd-muted-foreground hover:text-fd-foreground dark:text-fd-muted-foreground dark:hover:text-fd-foreground'
									}`}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{link.name}
								</Link>
							))}
						</div>
						<div className="border-fd-border border-t pt-6 dark:border-fd-border">
							<div className="space-y-4">
								{navigation.secondaryLinks.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										className="block font-medium text-base text-fd-foreground dark:text-fd-foreground"
									>
										{link.name}
									</Link>
								))}
							</div>
						</div>
						<div className="border-fd-border border-t pt-6 dark:border-fd-border">
							<ThemeToggle />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
