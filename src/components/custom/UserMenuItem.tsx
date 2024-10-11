"use client";

import type { ReactNode } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface UserMenuItemProps {
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  text: string;
}

export const UserMenuItem = ({
  className,
  icon,
  onClick,
  text,
}: UserMenuItemProps) => {
  return (
    <DropdownMenuItem
      className={cn(
        "hover:bg-new-neutral-0 flex h-11 items-center space-x-2 rounded-none px-4 hover:bg-opacity-[0.03]",
        !!onClick && "text-new-brand-50 cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {/* {icon ?? null} */}
      <span>{text}</span>
    </DropdownMenuItem>
  );
};
