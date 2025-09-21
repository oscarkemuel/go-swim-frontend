import { multiSessionClient } from "better-auth/client/plugins"
import { nextCookies } from "better-auth/next-js"
import { createAuthClient } from "better-auth/react"

export const authClient =  createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  fetchOptions: {
    credentials: 'include'
  },
  plugins: [
    nextCookies(),
    multiSessionClient()
  ]
})