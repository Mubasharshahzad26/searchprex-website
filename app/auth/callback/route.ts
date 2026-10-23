import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

function safeNextPath(value: string | null): string {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : '/dashboard';
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = safeNextPath(url.searchParams.get('next'));

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL(next, url.origin));
      console.error('[auth/callback] Supabase code exchange failed:', error.message);
    } catch (error) {
      console.error('[auth/callback] OAuth callback failed:', error);
    }
  }

  const login = new URL('/login', url.origin);
  login.searchParams.set('next', next);
  login.searchParams.set('error', url.searchParams.get('error_description') || url.searchParams.get('error') || 'Could not authenticate. Check the Google/Supabase redirect configuration and try again.');
  return NextResponse.redirect(login);
}
