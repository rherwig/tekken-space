import { Profile } from '@tekken-space/database'
import { Avatar } from '@nextui-org/react'
import TheCreateHandleForm from '@/components/profile/forms/the-create-handle-form'

export default function ProfileWidget({ user }: { user: Profile }) {
    return (
        <div className="flex items-center gap-4">
            <Avatar name="@" isBordered radius="lg" size="sm" />
            {user.handle ? <div>{user.handle}</div> : <TheCreateHandleForm />}
        </div>
    )
}
