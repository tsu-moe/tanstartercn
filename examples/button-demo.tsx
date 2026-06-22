import { ArrowUpIcon } from "lucide-react";

import { Button } from "@/registry/luma/button";

export default function ButtonDemo() {
  return (
    <div className="flex items-center gap-3">
      <Button>Button</Button>
      <Button size="icon" variant="outline" aria-label="Scroll up">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
