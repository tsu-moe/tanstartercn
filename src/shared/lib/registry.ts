import type { ComponentType } from "react";

import { Button as LumaButton } from "@/registry/luma/button";
import Sidebar01Page from "@/registry/luma/sidebar-01/page";
import { YourComponent } from "@/registry/luma/your-component";

import registryManifest from "../../../registry.json";

type RegistryFile = {
  path: string;
  type: string;
  target?: string;
  content?: string;
};

type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  categories?: string[];
  files?: RegistryFile[];
};

type RegistryComponent = ComponentType<Record<string, never>>;

type RegistryComponentMap = Record<string, Record<string, RegistryComponent>>;
type RegistryItemMap = Record<string, Record<string, RegistryItem>>;
type DemoModule = {
  default?: RegistryComponent;
};

const registrySources = import.meta.glob("../../registry/**/*.tsx", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const exampleSources = import.meta.glob("../../../examples/*.tsx", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const exampleModules = import.meta.glob("../../../examples/*.tsx", {
  eager: true,
}) as Record<string, DemoModule>;

const normalizePath = (value: string) => value.replaceAll("\\", "/");

const toDemoName = (filePath: string) =>
  normalizePath(filePath)
    .split("/")
    .at(-1)
    ?.replace(/\.tsx$/, "");

const toRootPath = (filePath: string) =>
  normalizePath(filePath)
    .replace(/^\.\.\/\.\.\/registry\//, "src/registry/")
    .replace(/^\.\.\/\.\.\/\.\.\/examples\//, "examples/");

const sourceByRootPath = new Map<string, string>(
  [...Object.entries(registrySources), ...Object.entries(exampleSources)].map(
    ([filePath, source]) => [toRootPath(filePath), source]
  )
);

const inferStyleName = (item: RegistryItem) => {
  const firstPath = item.files?.[0]?.path ?? "";
  const match = firstPath.match(/src\/registry\/([^/]+)\//);

  return match?.[1] ?? "luma";
};

const manifestItems = registryManifest.items as RegistryItem[];

const allRegistryItems = Object.fromEntries(
  manifestItems.map((item) => [item.name, item])
) as Record<string, RegistryItem>;

const registryItemsByStyle = manifestItems.reduce<RegistryItemMap>(
  (acc, item) => {
    const styleName = inferStyleName(item);
    acc[styleName] ??= {};
    acc[styleName][item.name] = item;

    return acc;
  },
  {}
);

const registryComponents: RegistryComponentMap = {
  luma: {
    button: LumaButton as RegistryComponent,
    "sidebar-01": Sidebar01Page as RegistryComponent,
    "your-component": YourComponent as RegistryComponent,
  },
};

const demoComponentsByName = Object.fromEntries(
  Object.entries(exampleModules).flatMap(([filePath, mod]) => {
    const name = toDemoName(filePath);

    return name && mod.default ? [[name, mod.default]] : [];
  })
) as Record<string, RegistryComponent>;

const demoComponents: RegistryComponentMap = {
  default: demoComponentsByName,
  luma: demoComponentsByName,
};

const normalizeStyleName = (styleName = "luma") =>
  styleName.replace(/-v4$/, "");

const styleCandidates = (styleName: string) => {
  const normalized = normalizeStyleName(styleName);

  return Array.from(new Set([styleName, normalized, "default"]));
};

const pickFromStyleMap = <T>(
  map: Record<string, Record<string, T>>,
  name: string,
  styleName: string
) => {
  for (const candidate of styleCandidates(styleName)) {
    const value = map[candidate]?.[name];

    if (value) {
      return value;
    }
  }

  return undefined;
};

const withFileContent = (item: RegistryItem): RegistryItem => ({
  ...item,
  files: item.files?.map((file) => ({
    ...file,
    content: sourceByRootPath.get(normalizePath(file.path)),
  })),
});

export const readOptionalFromRoot = async (
  relativePath: string
): Promise<string | null> => {
  return sourceByRootPath.get(normalizePath(relativePath)) ?? null;
};

const getDemoComponent = (name: string, styleName = "luma") =>
  pickFromStyleMap(demoComponents, name, styleName) ?? null;

export const getDemoItem = async (
  name: string,
  styleName = "luma"
): Promise<RegistryItem | null> => {
  const demo = getDemoComponent(name, styleName);

  if (!demo) {
    return null;
  }

  const path = `examples/${name}.tsx`;
  const content = await readOptionalFromRoot(path);

  if (!content) {
    return null;
  }

  return {
    name,
    title: name,
    type: "registry:example",
    files: [{ path, type: "registry:example", content }],
  };
};

export const getRegistryComponent = (name: string, styleName = "luma") => {
  const demo = getDemoComponent(name, styleName);

  if (demo) {
    return demo;
  }

  return (
    pickFromStyleMap(registryComponents, name, styleName) ??
    Object.values(registryComponents)
      .map((items) => items[name])
      .find(Boolean) ??
    null
  );
};

export const getRegistryItem = async (
  name: string,
  styleName = "luma"
): Promise<RegistryItem | null> => {
  const item =
    pickFromStyleMap(registryItemsByStyle, name, styleName) ??
    allRegistryItems[name];

  return item ? withFileContent(item) : null;
};
