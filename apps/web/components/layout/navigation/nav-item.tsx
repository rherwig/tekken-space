import { Link } from '@nextui-org/react'

export default function NavItem({
    children,
    href,
}: {
    children: React.ReactNode
    href: string
}) {
    return (
        <li>
            <Link href={href} className="px-4">
                {children}
            </Link>
        </li>
    )
}
