import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/logo.svg';
import { siteConfig } from '../config';

export function Footer() {
	return (
		<div className="border-white/20 border-t bg-gradient-to-b from-transparent to-fd-background/50">
			<footer className="container relative mx-auto grid grid-cols-2 gap-8 overflow-hidden pt-8 sm:grid-cols-3 sm:pt-12 md:pt-16 lg:gap-16 lg:pt-24 xl:grid-cols-5 xl:pt-32">
				{/* Logo and Description Column */}
				<div className="col-span-2 flex flex-col items-center sm:col-span-3 sm:items-start xl:col-span-2">
					<div className="flex flex-row gap-4">
						<Image
							src={logo}
							alt="Koroflow"
							className="h-8 w-auto dark:invert"
						/>
						<span className="inline-flex items-center rounded-full border bg-fd-primary/10 px-2.5 py-0.5 font-semibold text-fd-primary text-xs">
							Beta
						</span>
					</div>
					<div className="mt-8 font-normal text-sm text-white/60 leading-6">
						{siteConfig.description}
					</div>
				</div>

				{/* Links Columns */}
				{siteConfig.footer.links.map((section) => (
					<div
						key={section.title}
						className="col-span-1 flex flex-col gap-8 text-left"
					>
						<span className="w-full font-display font-medium text-sm text-white tracking-wider">
							{section.title}
						</span>
						<ul className="flex flex-col gap-4 md:gap-6">
							{section.items.map((link) => (
								<li key={link.text}>
									<Link
										href={link.url}
										target={link.external ? '_blank' : undefined}
										rel={link.external ? 'noopener noreferrer' : undefined}
										className="font-normal text-sm text-white/70 transition hover:text-white/40"
									>
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</footer>

			{/* BorderText Component */}
			<div className="container mt-8 h-[175px] overflow-hidden">
				<div className="flex w-full justify-center">
					<div className="bg-gradient-to-tr from-white/40 to-white/10 bg-clip-text font-bold text-[248px] text-transparent leading-none tracking-tighter">
						{siteConfig.name}
					</div>
				</div>
			</div>
		</div>
	);
}
