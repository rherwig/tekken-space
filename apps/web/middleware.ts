import { NextRequest, NextResponse } from 'next/server'
import { validateRequest } from '@/lib/auth'

export const config = {
    matcher: '/characters',
}

export async function middleware(request: NextRequest) {
    if (request.method === 'GET') {
        return NextResponse.next()
    }

    const { user } = await validateRequest()
    if (!user) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}
