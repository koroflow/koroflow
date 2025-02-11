export const defaultPage = `import {
	ConsentManagerProvider,
	ConsentManagerDialog,
	CookieBanner,
} from '@c15t/react';
import { ExampleContent } from './exampleContent';
import '@c15t/react/globals.css';

function App() {
    return (
		<ConsentManagerProvider initialGdprTypes={['necessary', 'marketing']}>
			<CookieBanner />
			<ConsentManagerDialog />
			<ExampleContent/>
		</ConsentManagerProvider>
	);
}

export default App;
`;

export const exampleContent = `import { useEffect } from 'react';

export function ExampleContent() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			try {
				// Clear localStorage
				localStorage.clear();
			} catch (error) {
				console.warn('Error during cleanup:', error);
			}
		}
	}, []);

  useEffect(() => {
		// Handle system color scheme
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
			document.documentElement.classList.toggle('dark', e.matches);
			document.documentElement.classList.toggle('light', !e.matches);
		};

		// Initial setup
		handleChange(mediaQuery);

		// Listen for changes
		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, []);

	return (
		<div className="min-h-screen flex justify-center items-center dark:bg-[#18191c]">
				<main className="mx-auto max-w-2xl text-center">
					<div className="bg-gradient-to-t light:from-black/40 dark:from-white/40 light:to-black/10 dark:to-white/10 bg-clip-text font-bold text-[60px] text-transparent leading-none tracking-tighter">c15t.com</div>
			  </main>
			</div>
	);
}
`;
