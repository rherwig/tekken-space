'use client'

import Link from 'next/link'
import { House, LayoutGrid, Share2 } from 'lucide-react'

export function TheMobileNavigation() {
    const links = [
        {
            href: '/',
            icon: House,
            label: 'Home',
        },
        {
            href: '/characters',
            icon: LayoutGrid,
            label: 'Characters',
        },
        {
            href: '/share',
            icon: Share2,
            label: 'Share',
        },
    ]

    return (
        <nav className="sticky bottom-0 z-10 w-full bg-black shadow-lg lg:hidden">
            <ul className="grid h-14 grid-cols-3 gap-2">
                {links.map((link) => (
                    <li key={link.href} className="h-full w-full">
                        <Link
                            href={link.href}
                            className="flex h-full w-full flex-col items-center justify-center"
                        >
                            <link.icon className="size-5" />
                            <span className="text-xs">{link.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
