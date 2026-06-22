"use client";

import { useCallback, useRef } from "react";

import { ArrowRightIcon } from "@/shared/components/animated-icons/arrow-right";
import type { ArrowRightIconHandle } from "@/shared/components/animated-icons/arrow-right";
import { ComponentIcon } from "@/shared/components/animated-icons/component";
import type { ComponentIconHandle } from "@/shared/components/animated-icons/component";
import { Link } from "@/shared/components/link";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/lib/utils";

const GetStartedButton = () => {
  const arrowRightRef = useRef<ArrowRightIconHandle>(null);

  const handleMouseEnter = useCallback(() => {
    arrowRightRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    arrowRightRef.current?.stopAnimation();
  }, []);

  return (
    <Button
      asChild
      className="px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={ROUTES.DOCS_INSTALLATION}>
        Get Started
        <ArrowRightIcon className="hidden sm:inline" ref={arrowRightRef} />
      </Link>
    </Button>
  );
};

const BrowseComponentsButton = () => {
  const componentIconRef = useRef<ComponentIconHandle>(null);

  const handleMouseEnter = useCallback(() => {
    componentIconRef.current?.startAnimation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    componentIconRef.current?.stopAnimation();
  }, []);

  return (
    <Button
      asChild
      variant="outline"
      className="px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={ROUTES.DOCS_COMPONENTS}>
        <ComponentIcon
          className="hidden sm:inline"
          ref={componentIconRef}
          size={22}
        />
        Browse Components
      </Link>
    </Button>
  );
};

export const HomeCtas = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex flex-wrap items-center justify-center gap-4",
      className
    )}
  >
    <GetStartedButton />
    <BrowseComponentsButton />
  </div>
);
