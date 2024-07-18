'use client'

import React from 'react'
import { Profile } from '@tekken-space/database'
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from '@nextui-org/react'
import { HiLogout, HiUser } from 'react-icons/hi'
import TheCreateHandleForm from '@/components/profile/forms/the-create-handle-form'

function ProfileDropdown({ user }: { user: Profile }) {
    const isAdmin = user.role === 'admin'

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button>{user.handle}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown Variants">
                <DropdownSection title="Actions" showDivider={isAdmin}>
                    <DropdownItem
                        description="View your profile"
                        href={`/@${user.handle}`}
                        startContent={<HiUser />}
                    >
                        Profile
                    </DropdownItem>
                    <DropdownItem
                        key="sign-out"
                        color="danger"
                        className="text-danger"
                        href="/sign-out"
                        startContent={<HiLogout />}
                    >
                        Sign Out
                    </DropdownItem>
                </DropdownSection>

                {isAdmin ? (
                    <DropdownSection title="Administration">
                        <DropdownItem
                            description="Create, edit and remove characters."
                            href="/admin"
                        >
                            Manage Characters
                        </DropdownItem>
                    </DropdownSection>
                ) : (
                    <></>
                )}
            </DropdownMenu>
        </Dropdown>
    )
}

export default function ProfileWidget({ user }: { user: Profile }) {
    return (
        <div className="flex items-center gap-4">
            <Avatar name="@" isBordered radius="lg" size="sm" />
            {user.handle ? (
                <ProfileDropdown user={user} />
            ) : (
                <TheCreateHandleForm />
            )}
        </div>
    )
}
