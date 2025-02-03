import { BorderText } from '~/components/marketing/border-number';
import { siteConfig } from '../config';

export function Footer() {
	return (
		<footer className="container mt-8 flex flex-col gap-y-5 rounded-lg px-7 py-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-2">
					<h2 className="font-bold text-foreground text-lg">
						{siteConfig.name}
					</h2>
				</div>
			</div>
			<div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
				<ul className="flex flex-col gap-x-5 gap-y-2 text-muted-foreground md:flex-row md:items-center">
					{siteConfig.footer.links.map((link) => (
						<li
							key={link.text}
							className="font-medium text-[15px]/normal text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
						>
							<a href={link.url}>{link.text}</a>
						</li>
					))}
				</ul>
				<div className="flex items-center justify-between font-medium text-muted-foreground text-sm tracking-tight">
					<p>{siteConfig.footer.bottomText}</p>
				</div>
			</div>
			<BorderText
				text={siteConfig.footer.brandText}
				className="overflow-hidden font-medium font-mono text-[clamp(3rem,15vw,10rem)] tracking-tighter"
			/>
		</footer>
	);
}
