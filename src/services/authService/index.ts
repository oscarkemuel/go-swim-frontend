import { api } from "@/lib/api";
import { ForgotPasswordReponse } from "./types";

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
  forgotPassword: async (payload: { email: string; redirectTo: string }) =>
    api<ForgotPasswordReponse>({
      url: "/auth/request-password-reset",
      options: {
        method: "POST",
        body: JSON.stringify({ ...payload }),
      },
    }),
  resetPassword: async (payload: {
    token: string;
    newPassword: string;
  }) =>
    api({
      url: "/auth/reset-password",
      options: {
        method: "POST",
        body: JSON.stringify({ ...payload }),
      },
    }),
};
