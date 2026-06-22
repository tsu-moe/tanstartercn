export const formatCode = async (code: string, _styleName = "luma") => {
  return code
    .replace(/@\/registry\/[^/]+\//g, "@/components/ui/")
    .replaceAll("export default", "export")
    .trim();
};
