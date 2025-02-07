import type { ReactNode } from 'react';
import Navbar from '~/components/docs/navbar';
import { Footer } from '../(home)/_components/footer';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
