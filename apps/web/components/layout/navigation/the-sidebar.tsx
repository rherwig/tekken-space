'use client'

import Link from 'next/link'
import { House, LayoutGrid, Share2 } from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@tekken-space/ui/base'

export function TheSidebar() {
    const links = [
        {
            label: 'Home',
            href: '/',
            icon: House,
        },
        {
            label: 'Characters',
            href: '/characters',
            icon: LayoutGrid,
        },
        {
            label: 'Share',
            href: '/share',
            icon: Share2,
        },
    ]

    const { toggleSidebar } = useSidebar()

    return (
        <Sidebar variant="floating">
            {/*<SidebarHeader />*/}
            <SidebarContent aria-describedby="sidebar-content-description">
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {links.map(({ label, href, icon: Icon }) => (
                                <SidebarMenuItem key={label}>
                                    <SidebarMenuButton
                                        onClick={toggleSidebar}
                                        asChild
                                    >
                                        <Link href={href}>
                                            <Icon />
                                            <span>{label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {/*<SidebarFooter />*/}
        </Sidebar>
    )
}
