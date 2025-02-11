
"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DASHBOARD_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";
import { APP_NAME } from "@/lib/constants";

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{APP_NAME}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {DASHBOARD_ROUTES.map((item) => (
                <SidebarMenuItem key={item.path} className="">
                  <SidebarMenuButton asChild className={cn(
                    "py-5 px-4 transition-all cursor-pointer hover:bg-gray-200 hover:text-tertiary",
                    pathname.includes(item.path) ? "bg-gray-200 text-tertiary" : "",
                  )}>
                    <a href={item.path}>
                      <item.icon />
                      <span >{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
