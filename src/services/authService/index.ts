import { api } from "@/lib/api";

export const authService = {
  login: async (payload: { email: string; password: string }) =>
    api({
      url: "/auth/login",
      options: {
        method: "POST",
        body: JSON.stringify({ ...payload }),
      },
    }),
  logout: async () =>
    api({
      url: "/auth/logout",
      options: {
        method: "POST",
      },
    }),
};
