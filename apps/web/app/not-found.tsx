import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="container">
            <div className="mb-10 mt-20 text-center">
                <h1 className="font-logo text-display">
                    <span className="text-green-500">4</span>
                    <span className="text-copy/80">0</span>
                    <span className="text-green-500">4</span>
                </h1>
                <p className="text-copy/50 text-2xl">
                    Oh, no! Looks like the page, you tried to access, ran away.
                </p>
            </div>

            <div className="text-center text-xl">
                <p>
                    If you wave-dash fast enough, you might be able to catch it.
                </p>
                <p>Otherwise, try one of these pages:</p>

                <ul className="mt-10 space-y-2">
                    <li>
                        <Link
                            className="text-green-500 hover:text-green-700"
                            href="/"
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="text-green-500 hover:text-green-700"
                            href="/characters"
                        >
                            Characters
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="text-green-500 hover:text-green-700"
                            href="/share"
                        >
                            Share
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
