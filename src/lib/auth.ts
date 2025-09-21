import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  plugins: [
    nextCookies()
  ],
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  emailAndPassword: {
    enabled: true,
  }  
});