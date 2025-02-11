import { AppSidebar } from '@/components/custom/app-sidebar'
import { Header } from '@/components/custom/header'
import { SidebarProvider } from '@/components/ui/sidebar'
import React, { PropsWithChildren } from 'react'

function MainLayout({ children }: PropsWithChildren) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex-1">
                <Header />
                <div className="p-5">{children}</div>
            </div>
        </SidebarProvider>
    )
}

export default MainLayout