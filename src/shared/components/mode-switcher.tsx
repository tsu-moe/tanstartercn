"use client";

import { AnimatedThemeIcon } from "@/shared/components/animated-icons/theme";
import { Button } from "@/shared/components/ui/button";
import { Kbd } from "@/shared/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { useThemeToggle } from "@/shared/hooks/use-theme-toggle";

export const ModeSwitcher = () => {
  const { resolvedTheme, toggleTheme } = useThemeToggle();
  const themeState = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group/toggle extend-touch-target size-8"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          <AnimatedThemeIcon
            key={themeState}
            state={themeState}
            className="size-4"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="pr-2 pl-3">
        <div className="flex items-center gap-3">
          Toggle Mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
