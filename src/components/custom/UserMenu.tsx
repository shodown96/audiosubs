"use server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LogOutIcon } from "lucide-react";
import { UserMenuItem } from "./UserMenuItem";
import { UserMenuTrigger } from "./UserMenuTrigger";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/constants";

export const UserMenu = async () => {
  const user = await currentUser();

  if (!user) return null;

  const { emailAddresses, firstName, imageUrl, lastName } = user;
  const emailAddress = emailAddresses[0].emailAddress;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='[&[data-state="open"]>div>span#name]:underline outline-none'>
        <UserMenuTrigger
          firstName={firstName}
          imageUrl={imageUrl}
          lastName={lastName}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[270px] rounded-[8px] p-0">
        <UserMenuItem text={emailAddress} />
        <div className="mx-2 border-b" />
        <a href={PATHS.SUBTITLES}><UserMenuItem text="My Subtitles" /></a>
        <div className="mx-2 border-b" />
        <SignOutButton>
          <UserMenuItem icon={<LogOutIcon />} text="Log out" />
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
