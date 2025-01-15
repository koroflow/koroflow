import {
  Shield,
  X,
} from "lucide-react";

import { Button } from "../components/ui/button";

interface HeaderProps {
  onClose: () => void;
}

export function Header({ onClose }: HeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="text-sm font-medium">Better Events Dev Tool</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
