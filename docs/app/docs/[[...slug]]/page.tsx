import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { ComponentSourceServer } from "@/components/render/component-source-server";
import { cn } from "@/lib/utils";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { createTypeTable } from "fumadocs-typescript/ui";
import { Pre, CodeBlock } from "fumadocs-ui/components/codeblock";
import Link from "fumadocs-core/link";
import { ComponentPreviewServer } from "@/components/render/component-preview-server";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  const { AutoTypeTable } = createTypeTable();
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{ style: "clerk" }}
      full={page.data.full}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            ComponentSource: ComponentSourceServer,
            ComponentPreview: ComponentPreviewServer,
            AutoTypeTable,
            TypeTable,
            Step,
            Steps,
            Tabs,
            Tab,
            pre: ({ ref: _ref, ...props }) => (
              <CodeBlock {...props}>
                <Pre>{props.children}</Pre>
              </CodeBlock>
            ),
            LinkedCard: ({
              className,
              ...props
            }: React.ComponentProps<typeof Link>) => (
              <Link
                className={cn(
                  "flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
                  className
                )}
                {...props}
              />
            ),
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
