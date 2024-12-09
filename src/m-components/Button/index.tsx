"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  const handleClick = () => {
    alert("clicked");
  };
  return (
    <Button onClick={handleClick}>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  );
}
