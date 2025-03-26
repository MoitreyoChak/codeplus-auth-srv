import { NextResponse } from 'next/server'

export async function GET(request) {
    return NextResponse.json({ name: 'Tommy' }, { status: 200 })
}

//codeplus.dev/api/users/currentUser