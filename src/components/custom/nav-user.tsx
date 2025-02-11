"use client"

import {
    ChevronsUpDown,
    LogOut,
    User2
} from "lucide-react"

import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { PATHS } from "@/lib/constants"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"

export function NavUser() {
    const { isMobile } = useSidebar()
    const { user } = useUser();
    const { signOut } = useClerk()
    const router = useRouter();
    const handleSignOut = async () => {
        await signOut()
        // router.replace(PATHS.SIGN_IN);
    };

    if (!user) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                {/* <AvatarImage src={user.avatar?.url} alt={user.name} /> */}
                                <AvatarFallback className="rounded-lg bg-gray-200">
                                    {user.fullName?.split(" ").map(v => v?.[0] || "A").join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.fullName}</span>
                                <span className="truncate text-xs">{String(user.primaryEmailAddress)}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    {/* <AvatarImage src={user.avatar?.url} alt={user.name} /> */}
                                    <AvatarFallback className="rounded-lg">
                                        {user.fullName?.split(" ").map(v => v?.[0] || "A").join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.fullName}</span>
                                    <span className="truncate text-xs">{user?.primaryEmailAddress?.emailAddress}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href={PATHS.PROFILE}>
                                <DropdownMenuItem>
                                    <User2 />
                                    Account
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

