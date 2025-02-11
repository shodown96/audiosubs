"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn, getBreadcrumbs } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { SidebarTrigger } from "../ui/sidebar";

export const Header = () => {
  const pathname = usePathname();
  const breadCrumbs = getBreadcrumbs(pathname);
  return (
    <div className="p-4 border-b border-gray-400 w-full flex items-center gap-2">
      <SidebarTrigger />
      <div className="flex justify-between items-center">
        {/* <div className="brand"><Icons.logo color='black' className='bg-primary'/></div>
       */}
        <Breadcrumb>
          <BreadcrumbList>
            {breadCrumbs.map((path, i) => (
              <Fragment key={path.path}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={path.path} className={cn(
                    path.path.replace(" ", "").length < 24 ? "capitalize" : "",
                    "text-black"
                  )}>
                    {path.text}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {(!i && breadCrumbs.length - 1 && i !== breadCrumbs.length - 1) ||
                  (breadCrumbs.length > 2 &&
                    i > 0 &&
                    i !== breadCrumbs.length - 1) ? (
                  <BreadcrumbSeparator />
                ) : null}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
