"use server";

import { useMemo } from "react";
import type { ClerkUserName } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formatUserData = (firstName: ClerkUserName, lastName: ClerkUserName) => {
  if (!firstName) {
    return { initials: "US", name: "User" };
  }

  if (!lastName) {
    return { initials: firstName.slice(0, 2).toUpperCase(), name: firstName };
  }

  return {
    initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
    name: `${firstName} ${lastName[0]}.`,
  };
};

interface UserMenuTriggerProps {
  firstName: ClerkUserName;
  imageUrl: string;
  lastName: ClerkUserName;
}

export const UserMenuTrigger = ({
  firstName,
  imageUrl,
  lastName,
}: UserMenuTriggerProps) => {
  const { initials, name } = useMemo(
    () => formatUserData(firstName, lastName),
    [firstName, lastName],
  );

  return (
    <div className="flex items-center max-lg:space-x-[10px]">
      <span
        className="text-white font-medium transition-all hover:underline lg:hidden"
        id="name">
        {name}
      </span>
      <Avatar className="border-new-white size-11 rounded-full border-2">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
};
