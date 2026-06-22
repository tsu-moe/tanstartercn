"use client";

import { AnimatedGitHubIcon } from "@/shared/components/animated-icons/github";
import { buttonVariants } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { LINK } from "@/shared/constants/links";
import { UTM_PARAMS } from "@/shared/constants/site";
import { addQueryParams } from "@/shared/lib/url";
import { cn } from "@/shared/lib/utils";

export const GitHubStars = ({
  stargazersCount,
}: {
  stargazersCount: number;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
        href={addQueryParams(LINK.GITHUB, UTM_PARAMS)}
        rel="noopener"
        target="_blank"
      >
        <AnimatedGitHubIcon className="-translate-y-px" />
        <span className="text-muted-foreground text-xs tabular-nums">
          {new Intl.NumberFormat("en-US", {
            compactDisplay: "short",
            notation: "compact",
          })
            .format(stargazersCount)
            .toLowerCase()}
        </span>
      </a>
    </TooltipTrigger>
    <TooltipContent>
      {new Intl.NumberFormat("en-US").format(stargazersCount)} stars
    </TooltipContent>
  </Tooltip>
);
