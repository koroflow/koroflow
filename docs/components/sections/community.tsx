"use client";

import Link from "next/link";

import { Icons } from "@/components/icons";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import {Ripple} from "@/components/ui/ripple";


export function Community() {
  return (
    <Section id="community" title="Community" >
      <div className="border-x border-t overflow-hidden relative border-b rounded-b-xl bg-background">
        <Ripple />
        <div className="p-6 text-center py-12">
          <p className="text-muted-foreground mb-6 text-balance max-w-prose mx-auto font-medium">
            Built in the open. Powered by community.
          </p>

          <div className="flex justify-center space-x-4">
            <Button
              className="flex items-center gap-2"
              asChild
            >
              <Link href="https://github.com/koroflow/koroflow">
                <Icons.github className="h-5 w-5" />
                Become a contributor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
