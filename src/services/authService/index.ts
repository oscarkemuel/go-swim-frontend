import { api } from "@/lib/api";

export const authService = {
  login: async (payload: { email: string; password: string }) =>
    api({
      url: "/auth/sign-in/email",
      options: {
        method: "POST",
        body: JSON.stringify({ ...payload }),
      },
    }),
  logout: async () =>
    api({
      url: "/auth/sign-out",
      options: {
        method: "POST",
      },
    }),
};
