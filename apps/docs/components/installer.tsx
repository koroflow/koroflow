'use client';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Button } from '@koroflow/shadcn-ui/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@koroflow/shadcn-ui/components/ui/tabs';
import { CheckIcon, CopyIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import korowflow from '../public/logomark.svg';
import shadcn from '../public/shadcn.svg';

type InstallerProps = {
  packageName: string;
};

export const Installer = ({ packageName }: InstallerProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    onCopy: () => toast.success('Copied to clipboard!'),
  });
  const [value, setValue] = useState('korowflow');

  const commands: Record<string, string> = {
    korowflow: `npx korowflow-ui@latest add ${packageName}`,
    shadcn: `npx shadcn@latest add https://www.korowflow.com/registry/${packageName}.json`,
  };

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="not-prose group shiki shiki-themes github-light github-dark relative my-6 overflow-hidden rounded-lg border bg-fd-secondary/50 text-sm"
    >
      <div className="flex flex-row items-center justify-between border-b bg-fd-muted p-2">
        <TabsList className="h-auto w-full justify-start rounded-none bg-transparent">
          <TabsTrigger
            value="korowflow"
            className="flex flex-row items-center gap-1.5"
          >
            <Image
              src={korowflow}
              alt=""
              width={14}
              height={14}
              className="dark:invert"
            />
            korowflow
          </TabsTrigger>
          <TabsTrigger
            value="shadcn"
            className="flex flex-row items-center gap-1.5"
          >
            <Image
              src={shadcn}
              alt=""
              width={14}
              height={14}
              className="dark:invert"
            />
            shadcn
          </TabsTrigger>
        </TabsList>
        <Button
          variant="ghost"
          size="icon"
          //@ts-expect-error
          onClick={() => copyToClipboard(commands[value])}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        >
          {isCopied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
        </Button>
      </div>
      <TabsContent value="korowflow" className="m-0 p-4">
        <pre className="text-sm">{commands.korowflow}</pre>
      </TabsContent>
      <TabsContent value="shadcn" className="m-0 p-4">
        <pre className="text-sm">{commands.shadcn}</pre>
      </TabsContent>
    </Tabs>
  );
};
