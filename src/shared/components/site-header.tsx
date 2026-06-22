import { BrandContextMenu } from "@/shared/components/brand-context-menu";
import { CommandMenu } from "@/shared/components/command-menu";
import { Link } from "@/shared/components/link";
import { LogoMark } from "@/shared/components/logo";
import { MainNav } from "@/shared/components/main-nav";
import { MobileNav } from "@/shared/components/mobile-nav";
import { ModeSwitcher } from "@/shared/components/mode-switcher";
import { NavItemGithub } from "@/shared/components/nav-item-github";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";
import { SITE } from "@/shared/constants/site";
import { source } from "@/shared/lib/source";

const navItems = [
  { href: ROUTES.DOCS, label: "Docs" },
  { href: ROUTES.DOCS_COMPONENTS, label: "Components" },
];

export const SiteHeader = () => (
  <header className="bg-background sticky top-0 z-50 w-full">
    <div className="container-wrapper 3xl:fixed:px-0 px-6">
      <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2">
        <MobileNav
          items={navItems}
          tree={source.pageTree}
          className="flex lg:hidden"
        />
        <BrandContextMenu>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden size-8 lg:flex"
          >
            <Link href={ROUTES.HOME}>
              <LogoMark className="size-5" />
              <span className="sr-only">{SITE.NAME}</span>
            </Link>
          </Button>
        </BrandContextMenu>
        <MainNav items={navItems} className="hidden lg:flex" />
        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
            <CommandMenu navItems={navItems} tree={source.pageTree} />
          </div>
          <NavItemGithub />
          <ModeSwitcher />
        </div>
      </div>
    </div>
  </header>
);
