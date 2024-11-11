import { ShareNotationForm } from '@/app/share/components/ShareNotationForm'

export const dynamic = 'force-dynamic'

export default async function Share() {
    return (
        <div className="container py-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
                Share Notation
            </h1>

            <p className="my-4 leading-7">
                Enter a Tekken Notation in the textbox below and use the buttons
                to share the URL or export is as image.
            </p>

            <ShareNotationForm />
        </div>
    )
}
