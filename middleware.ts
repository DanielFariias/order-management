import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login'];

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth');
  const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (!isAuthenticated && !isPublicRoute && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/orders', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos exceto:
     * 1. /api (rotas de API)
     * 2. /_next (arquivos do Next.js)
     * 3. /_vercel (arquivos do Vercel)
     * 4. /favicon.ico, /robots.txt, etc.
     */
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
