import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    const next = searchParams.get('next') ?? '/dashboard'

    console.log('Auth callback received:', { code: !!code, token_hash: !!token_hash, type, next })

    // Handle PKCE flow (OAuth)
    if (code) {
        console.log('Attempting PKCE flow with code')
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.error('PKCE exchange error:', error)
        } else {
            console.log('PKCE exchange successful')
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }
    }

    // Handle token-based flow (email confirmation, password reset)
    if (token_hash && type) {
        console.log('Attempting token-based flow')
        const supabase = await createClient()
        const { data, error } = await supabase.auth.verifyOtp({
            type: type as any,
            token_hash,
        })

        if (error) {
            console.error('Token verification error:', error)
        } else {
            console.log('Token verification successful')
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }
    }

    console.error('No valid auth parameters found')
    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
