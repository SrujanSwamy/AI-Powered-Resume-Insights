import { handleLogin } from "@/app/lib/actions";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Hardcode endpoints to skip slow OIDC auto-discovery (avoids timeout)
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      token: "https://oauth2.googleapis.com/token",
      userinfo: "https://openidconnect.googleapis.com/v1/userinfo",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      httpOptions: {
        timeout: 10000, // 10s instead of default 3.5s
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/google/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_token: account?.id_token,
            }),
          }
        );

        if (!response.ok) {
          console.error("Backend Google auth failed:", response.status);
          return false;
        }

        const data = await response.json();
        if (data.access && data.refresh) {
          await handleLogin(data.user_id, data.access, data.refresh);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/resume-analysis`;
    },
  },
});

export { handler as GET, handler as POST };