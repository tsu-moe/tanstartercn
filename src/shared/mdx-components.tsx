import type { LucideIcon } from "lucide-react";
import { createElement, type ElementType } from "react";

import { Callout } from "@/shared/components/callout";
import { CodeBlockCommand } from "@/shared/components/code-block-command";
import { CodeTabs } from "@/shared/components/code-tabs";
import { ComponentPreview } from "@/shared/components/component-preview";
import { ComponentSource } from "@/shared/components/component-source";
import { ComponentsList } from "@/shared/components/components-list";
import { CopyButton } from "@/shared/components/copy-button";
import { getIconForLanguageExtension } from "@/shared/components/icons";
import { Link } from "@/shared/components/link";
import { Step, Steps } from "@/shared/components/steps";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger as AccordionTriggerBase,
} from "@/shared/components/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { AspectRatio } from "@/shared/components/ui/aspect-ratio";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { useMdxPreview } from "@/shared/lib/mdx-preview-context";
import { cn } from "@/shared/lib/utils";

type MdxClassName = string | ((state: never) => string | undefined);

type MdxElementProps = {
  as: ElementType;
  mdxClasses: string;
  className?: MdxClassName;
  [key: string]: unknown;
};

function MdxElement({ as, mdxClasses, className, ...props }: MdxElementProps) {
  const isPreview = useMdxPreview();
  const resolvedClassName =
    typeof className === "function"
      ? (state: never) =>
          cn(isPreview ? undefined : mdxClasses, className(state))
      : cn(isPreview ? undefined : mdxClasses, className);

  return createElement(as, { ...props, className: resolvedClassName });
}

export const mdxComponents = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger: AccordionTriggerBase,
  Alert,
  AlertDescription,
  AlertTitle,
  AspectRatio,
  Button,
  Callout,
  CodeTabs,
  ComponentPreview,
  ComponentSource,
  ComponentsList,
  FeatureCard: ({
    icon: Icon,
    title,
    description,
    className,
  }: React.ComponentProps<typeof Card> & {
    icon: LucideIcon;
    title: string;
    description: string;
  }) => (
    <Card
      className={cn(
        "flex flex-col gap-2 rounded-xl py-4 shadow-none",
        className
      )}
    >
      <CardHeader className="flex items-center gap-2 px-4">
        <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-md text-primary">
          <Icon className="size-4" />
        </div>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 text-sm text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  ),
  Image: ({
    src,
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<"img">) => (
    <img
      className={cn("mt-6 rounded-md border", className)}
      src={src?.toString() || ""}
      width={Number(width)}
      height={Number(height)}
      alt={alt || ""}
      {...props}
    />
  ),
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col items-center rounded-xl p-6 transition-colors sm:p-10",
        className
      )}
      {...props}
    />
  ),
  Step,
  Steps,
  Tab: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div className={cn(className)} {...props} />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6",
        className
      )}
      {...props}
    />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "justify-start gap-4 rounded-none bg-transparent px-0",
        className
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "text-muted-foreground data-active:text-foreground data-active:border-primary dark:data-active:border-primary hover:text-primary rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base data-active:bg-transparent data-active:shadow-none dark:data-active:bg-transparent",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, children, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  code: ({
    className,
    __raw__,
    __src__,
    __npm__,
    __yarn__,
    __pnpm__,
    __bun__,
    ...props
  }: React.ComponentProps<"code"> & {
    __raw__?: string;
    __src__?: string;
    __npm__?: string;
    __yarn__?: string;
    __pnpm__?: string;
    __bun__?: string;
  }) => {
    // Inline Code.
    if (typeof props.children === "string") {
      return (
        <code
          className={cn(
            "bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] break-words outline-none",
            className
          )}
          {...props}
        />
      );
    }

    // npm command.
    const isNpmCommand = __npm__ && __yarn__ && __pnpm__ && __bun__;
    if (isNpmCommand) {
      return (
        <CodeBlockCommand
          __npm__={__npm__}
          __yarn__={__yarn__}
          __pnpm__={__pnpm__}
          __bun__={__bun__}
        />
      );
    }

    // Default codeblock.
    return (
      <>
        {__raw__ && (
          <CopyButton value={__raw__} src={__src__} event="copy_usage_code" />
        )}
        <code {...props} />
      </>
    );
  },
  figcaption: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"figcaption">) => {
    const iconExtension =
      "data-language" in props && typeof props["data-language"] === "string"
        ? getIconForLanguageExtension(props["data-language"])
        : null;

    return (
      <figcaption
        className={cn(
          "text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
          className
        )}
        {...props}
      >
        {iconExtension}
        {children}
      </figcaption>
    );
  },
  figure: ({ className, ...props }: React.ComponentProps<"figure">) => (
    <figure className={cn(className)} {...props} />
  ),
  h1: (props: React.ComponentProps<"h1">) => (
    <MdxElement
      as="h1"
      mdxClasses="font-heading mt-2 scroll-m-28 text-3xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: ({ children, ...props }: React.ComponentProps<"h2">) => (
    <MdxElement
      as="h2"
      mdxClasses="[&+]*:[code]:text-xl mt-10 scroll-m-28 font-heading text-xl font-medium tracking-tight first:mt-0 lg:mt-12 [&+.steps]:mt-0! [&+.steps>h3]:mt-4! [&+h3]:mt-6! [&+p]:mt-4!"
      id={children
        ?.toString()
        .replaceAll(" ", "-")
        .replaceAll("'", "")
        .replaceAll("?", "")
        .toLowerCase()}
      {...props}
    >
      {children}
    </MdxElement>
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <MdxElement
      as="h3"
      mdxClasses="mt-12 scroll-m-28 font-heading text-lg font-medium tracking-tight [&+p]:mt-4! *:[code]:text-xl"
      {...props}
    />
  ),
  h4: (props: React.ComponentProps<"h4">) => (
    <MdxElement
      as="h4"
      mdxClasses="font-heading mt-8 scroll-m-28 text-base font-medium tracking-tight"
      {...props}
    />
  ),
  h5: (props: React.ComponentProps<"h5">) => (
    <MdxElement
      as="h5"
      mdxClasses="mt-8 scroll-m-28 text-base font-medium tracking-tight"
      {...props}
    />
  ),
  h6: (props: React.ComponentProps<"h6">) => (
    <MdxElement
      as="h6"
      mdxClasses="mt-8 scroll-m-28 text-base font-medium tracking-tight"
      {...props}
    />
  ),
  hr: (props: React.ComponentProps<"hr">) => (
    <MdxElement as="hr" mdxClasses="my-4 md:my-8" {...props} />
  ),
  img: (props: React.ComponentProps<"img">) => (
    <MdxElement as="img" mdxClasses="rounded-md" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <MdxElement as="li" mdxClasses="mt-2" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <MdxElement as="ol" mdxClasses="my-6 ml-6 list-decimal" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <MdxElement
      as="p"
      mdxClasses="leading-relaxed [&:not(:first-child)]:mt-6"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <MdxElement
      as="pre"
      mdxClasses="no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-data-highlighted-line:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <MdxElement as="strong" mdxClasses="font-medium" {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="my-6 no-scrollbar w-full overflow-y-auto rounded-xl border">
      <table
        className={cn(
          "relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0",
          className
        )}
        {...props}
      />
    </div>
  ),
  td: (props: React.ComponentProps<"td">) => (
    <MdxElement
      as="td"
      mdxClasses="px-4 py-2 text-left whitespace-nowrap [[align=center]]:text-center [[align=right]]:text-right"
      {...props}
    />
  ),
  th: (props: React.ComponentProps<"th">) => (
    <MdxElement
      as="th"
      mdxClasses="px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right"
      {...props}
    />
  ),
  tr: (props: React.ComponentProps<"tr">) => (
    <MdxElement as="tr" mdxClasses="m-0 border-b" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <MdxElement as="ul" mdxClasses="my-6 ml-6 list-disc" {...props} />
  ),
};
