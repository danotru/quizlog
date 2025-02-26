import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/auth/middleware";

/**
 * Request middleware
 * @param request Next.js HTTP request
 */
export default async function middleware(request: NextRequest) {
  console.log("Middleware intercept.");
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
