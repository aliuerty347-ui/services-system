import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isBusinessRoute = createRouteMatcher([
  '/dash(.*)',
  '/services(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isBusinessRoute(req)) {
    // 1. إذا لم يكن مسجلاً للدخول، سيقوم Clerk بتوجيهه تلقائياً إلى صفحة تسجيل الدخول دون خطأ immutable
    const { sessionClaims } = await auth.protect()

    console.log("SESSION CLAIMS:", JSON.stringify(sessionClaims, null, 2))

    const role = (sessionClaims as any)?.metadata?.role
    console.log("USER ROLE IS:", role)

    // 2. إذا كان مسجلاً ولكن دوره ليس business، وجهه لصفحة onboarding باستخدام NextResponse
    if (role !== 'business') {
      const onboardingUrl = new URL('/onboarding', req.url)
      return NextResponse.redirect(onboardingUrl)
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx|xlsx|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
