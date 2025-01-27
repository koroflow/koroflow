import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { GithubIcon } from 'lucide-react';
import Image from 'next/image';
import logo from '../public/logo.svg';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <Image
        src={logo}
        alt="Koroflow"
        width={93}
        height={16}
        className="h-4 w-auto dark:invert"
      />
    ),
  },
  links: [
    {
      text: 'GitHub',
      url: 'https://github.com/koroflow/koroflow',
      icon: <GithubIcon />,
    },
  ],
};
