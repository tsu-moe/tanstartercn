# Registry Components

Use this when adding or changing shadcn registry items.

- Add shadcn primitives with `pnpm exec shadcn add <component>` when the new registry item depends on upstream shadcn/ui primitives.
- Put installable registry source under `src/registry/<style>/<component>.tsx`. The default local style is `luma`; additional styles are valid when reflected in `registry.json` and `src/shared/lib/registry.ts`.
- Update `registry.json` for every public item. Include `name`, `type`, `title`, `description`, dependencies when needed, and each file's source `path`, registry `type`, and install `target`.
- Wire previews in `src/shared/lib/registry.ts`. Import the registry component and add it to `registryComponents`; import demo files from `examples` and add them to `demoComponents` when docs use registry-resolved previews.
- Put reusable docs demos in `examples/<demo-name>.tsx`. For one-off examples, write the live JSX and fenced source inline inside `ComponentPreview`.
- Add or update MDX docs under `content/docs`; navigation is filesystem-first, so use `meta.json` only for optional folder metadata or custom ordering.
- Rebuild generated output with `pnpm registry:build` after registry changes and `pnpm static:build` after docs or metadata changes. Do not manually edit `public/r/*`, `.source/*`, `.tanstack/*`, or `src/routeTree.gen.ts`.
- For registry wiring or docs previews, verify with `pnpm typecheck`, `pnpm check`, and the smallest build command that covers the changed surface.

## Docs Preview Patterns

Registry-resolved preview using an `examples` file:

```mdx
<ComponentPreview styleName="luma" name="button-demo" />
```

Inline one-off preview:

````mdx
import { Button } from "@/registry/luma/button";

<ComponentPreview name="inline-button-example" title="inline-button-example.tsx">
  <Button variant="outline">Inline example</Button>

```tsx
import { Button } from "@/components/ui/button";

export function InlineButtonExample() {
  return <Button variant="outline">Inline example</Button>;
}
```

</ComponentPreview>
````

Manual source display:

```mdx
<ComponentSource
  src="src/registry/luma/button.tsx"
  title="components/ui/button.tsx"
/>
```
