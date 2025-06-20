import { exportTraceState } from "next/dist/trace";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


// Middleware to protect routes and redirect based on authentication status
// This middleware checks if the user is authenticated and redirects accordingly
// If the user is authenticated and tries to access login or signup, redirect to home
// If the user is not authenticated and tries to access protected routes, redirect to login
// If the user is authenticated, allow access to protected routes
// If the user is not authenticated, allow access to public routes
// If the user is authenticated, allow access to public routes
export function middleware(request : NextRequest){

    // Check if the request is for a public path (login or signup)
    // If the user is authenticated, redirect to home if they try to access login or signup 
    // If the user is not authenticated, allow access to public paths
    // If the user is authenticated, allow access to protected paths
    const path = request.nextUrl.pathname;

    // Define public paths that do not require authentication
    // If the user is authenticated, redirect to home if they try to access login or signup
    // If the user is not authenticated, allow access to public paths
    // If the user is authenticated, allow access to protected paths
    const isPublicPath = path === '/login' || path === '/signup';

    // If the user is authenticated, redirect to home if they try to access login or signup
    // If the user is not authenticated, allow access to public path
    // Check if the user is authenticated by checking for a token in cookies
  const token =  request.cookies.get('token')?.value|| '' ;

  // If the user is authenticated, redirect to home if they try to access login or signup
  
  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If the user is not authenticated, allow access to public paths

  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
    ]
}